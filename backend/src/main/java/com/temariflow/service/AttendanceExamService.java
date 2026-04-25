package com.temariflow.service;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.dto.Phase3Dtos.TeacherCommentRequest;
import com.temariflow.entity.*; import com.temariflow.exception.ApiException; import com.temariflow.repository.*;
import lombok.RequiredArgsConstructor; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Service;
import java.math.*; import java.time.*; import java.util.*; import java.util.stream.*;

@Service @RequiredArgsConstructor
public class AttendanceExamService {
  private final ErpLookup lookup;
  private final StudentProfileRepository students;
  private final TeacherProfileRepository teachers;
  private final StudentAttendanceRepository studentAttendance;
  private final TeacherAttendanceRepository teacherAttendance;
  private final ExamRepository exams;
  private final MarkEntryRepository marks;
  private final ResultSummaryRepository summaries;
  private final SubjectRepository subjects;
  private final GradeLevelRepository grades;
  private final PromotionRuleService promotionRuleService;

  public StudentAttendance studentAttendance(AttendanceRequest r) {
    return studentAttendance.save(StudentAttendance.builder().school(lookup.school())
        .student(students.findById(r.personId()).orElseThrow())
        .attendanceDate(r.date()).status(r.status()).note(r.note()).build());
  }
  public TeacherAttendance teacherAttendance(AttendanceRequest r) {
    return teacherAttendance.save(TeacherAttendance.builder().school(lookup.school())
        .teacher(teachers.findById(r.personId()).orElseThrow())
        .attendanceDate(r.date()).status(r.status()).note(r.note()).build());
  }
  public Map<AttendanceStatus, Long> monthlyStudentSummary(int year, int month) {
    var from = LocalDate.of(year, month, 1);
    var to = from.withDayOfMonth(from.lengthOfMonth());
    return studentAttendance.findBySchoolIdAndAttendanceDateBetween(lookup.schoolId(), from, to).stream()
        .collect(Collectors.groupingBy(StudentAttendance::getStatus, Collectors.counting()));
  }
  public Exam createExam(ExamRequest r) {
    return exams.save(Exam.builder().school(lookup.school()).name(r.name())
        .grade(r.gradeId()==null?null:grades.findById(r.gradeId()).orElseThrow())
        .startsAt(r.startsAt()).endsAt(r.endsAt()).build());
  }
  public MarkEntry mark(MarkRequest r) {
    return marks.save(MarkEntry.builder().school(lookup.school())
        .exam(exams.findById(r.examId()).orElseThrow())
        .student(students.findById(r.studentId()).orElseThrow())
        .subject(subjects.findById(r.subjectId()).orElseThrow())
        .mark(r.mark()).maxMark(r.maxMark()).build());
  }

  public List<ResultSummary> process(UUID examId) {
    var rule = promotionRuleService.current();
    var grouped = marks.findBySchoolIdAndExamId(lookup.schoolId(), examId).stream()
        .collect(Collectors.groupingBy(MarkEntry::getStudent));
    var rows = grouped.entrySet().stream().map(e -> {
      var avg = e.getValue().stream()
          .map(m -> m.getMark().multiply(BigDecimal.valueOf(100)).divide(m.getMaxMark(), 2, RoundingMode.HALF_UP))
          .reduce(BigDecimal.ZERO, BigDecimal::add)
          .divide(BigDecimal.valueOf(e.getValue().size()), 2, RoundingMode.HALF_UP);
      return ResultSummary.builder().school(lookup.school())
          .exam(exams.findById(examId).orElseThrow())
          .student(e.getKey()).average(avg)
          .decision(promotionRuleService.decide(avg, rule))
          .build();
    }).sorted(Comparator.comparing(ResultSummary::getAverage).reversed()).toList();
    int rank = 1; for (var row: rows) { row.setRankInClass(rank++); summaries.save(row); }
    return rows;
  }

  public ResultSummary addTeacherComment(TeacherCommentRequest req) {
    var row = summaries.findBySchoolIdAndExamId(lookup.schoolId(), req.examId()).stream()
        .filter(s -> s.getStudent().getId().equals(req.studentId())).findFirst()
        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Result not found"));
    row.setTeacherComment(req.comment());
    return summaries.save(row);
  }
}
