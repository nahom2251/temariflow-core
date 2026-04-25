package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.dto.Phase3Dtos.TeacherCommentRequest; import com.temariflow.entity.*; import com.temariflow.service.AttendanceExamService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.*;

@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class AttendanceExamController {
  private final AttendanceExamService service;
  @PostMapping("/attendance/students") @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER')") public StudentAttendance studentAttendance(@Valid @RequestBody AttendanceRequest r) { return service.studentAttendance(r); }
  @PostMapping("/attendance/teachers") @PreAuthorize("hasAnyRole('PRINCIPAL','SCHOOL_OWNER')") public TeacherAttendance teacherAttendance(@Valid @RequestBody AttendanceRequest r) { return service.teacherAttendance(r); }
  @GetMapping("/attendance/students/monthly") public Map<AttendanceStatus, Long> monthly(@RequestParam int year, @RequestParam int month) { return service.monthlyStudentSummary(year, month); }
  @PostMapping("/exams") @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER')") public Exam exam(@Valid @RequestBody ExamRequest r) { return service.createExam(r); }
  @PostMapping("/exams/marks") @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER')") public MarkEntry mark(@Valid @RequestBody MarkRequest r) { return service.mark(r); }
  @PostMapping("/exams/{examId}/process") @PreAuthorize("hasAnyRole('PRINCIPAL','SCHOOL_OWNER')") public List<ResultSummary> process(@PathVariable UUID examId) { return service.process(examId); }
  @PostMapping("/exams/comment") @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER')") public ResultSummary comment(@Valid @RequestBody TeacherCommentRequest r) { return service.addTeacherComment(r); }
}
