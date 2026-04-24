package com.temariflow.service;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import java.util.*;

@Service @RequiredArgsConstructor
public class AcademicService {
  private final ErpLookup lookup; private final GradeLevelRepository grades; private final SectionRepository sections; private final SubjectRepository subjects; private final CourseRepository courses; private final ClassAssignmentRepository assignments; private final TeacherProfileRepository teachers;
  public List<GradeLevel> grades() { return grades.findBySchoolId(lookup.schoolId()); }
  public GradeLevel createGrade(AcademicRequest r) { return grades.save(GradeLevel.builder().school(lookup.school()).name(r.name()).sortOrder(0).build()); }
  public Section createSection(AcademicRequest r) { return sections.save(Section.builder().school(lookup.school()).grade(grades.findById(r.gradeId()).orElseThrow()).name(r.name()).capacity(r.capacity()==null?40:r.capacity()).build()); }
  public Subject createSubject(AcademicRequest r) { return subjects.save(Subject.builder().school(lookup.school()).name(r.name()).code(r.code()).build()); }
  public Course createCourse(AcademicRequest r) { return courses.save(Course.builder().school(lookup.school()).name(r.name()).grade(grades.findById(r.gradeId()).orElseThrow()).subject(subjects.findById(r.subjectId()).orElseThrow()).build()); }
  public ClassAssignment assign(AcademicRequest r) { return assignments.save(ClassAssignment.builder().school(lookup.school()).teacher(teachers.findById(r.teacherId()).orElseThrow()).section(sections.findById(r.sectionId()).orElseThrow()).subject(subjects.findById(r.subjectId()).orElseThrow()).build()); }
}
