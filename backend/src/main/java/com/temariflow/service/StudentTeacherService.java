package com.temariflow.service;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.exception.ApiException; import com.temariflow.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Service; import java.util.*;

@Service @RequiredArgsConstructor
public class StudentTeacherService {
  private final StudentProfileRepository students; private final TeacherProfileRepository teachers; private final UserManagementService userService; private final UserRepository users; private final GradeLevelRepository grades; private final SectionRepository sections; private final ErpLookup lookup;
  public List<StudentProfile> students() { return students.findBySchoolId(lookup.schoolId()); }
  public StudentProfile createStudent(CreateStudentRequest r) { var dto = userService.create(r.fullName(), r.email(), null, UserRole.STUDENT); var user = users.findById(dto.id()).orElseThrow(); var s = StudentProfile.builder().school(lookup.school()).user(user).studentNumber(r.studentNumber()).gender(r.gender()).guardianName(r.guardianName()).guardianPhone(r.guardianPhone()).guardianEmail(r.guardianEmail()).grade(r.gradeId()==null?null:grades.findById(r.gradeId()).orElseThrow()).section(r.sectionId()==null?null:sections.findById(r.sectionId()).orElseThrow()).build(); return students.save(s); }
  public List<TeacherProfile> teachers() { return teachers.findBySchoolId(lookup.schoolId()); }
  public TeacherProfile createTeacher(CreateTeacherRequest r) { var dto = userService.create(r.fullName(), r.email(), null, UserRole.TEACHER); var user = users.findById(dto.id()).orElseThrow(); return teachers.save(TeacherProfile.builder().school(lookup.school()).user(user).employeeNumber(r.employeeNumber()).subjectSpecialty(r.subjectSpecialty()).salary(r.salary()).build()); }
  public StudentProfile student(UUID id) { return students.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Student not found")); }
}
