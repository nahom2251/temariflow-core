package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.service.StudentTeacherService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.*;

@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class StudentTeacherController {
  private final StudentTeacherService service;
  @GetMapping("/students") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER')") public List<StudentProfile> students() { return service.students(); }
  @PostMapping("/students") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')") public StudentProfile createStudent(@Valid @RequestBody CreateStudentRequest body) { return service.createStudent(body); }
  @GetMapping("/teachers") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')") public List<TeacherProfile> teachers() { return service.teachers(); }
  @PostMapping("/teachers") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')") public TeacherProfile createTeacher(@Valid @RequestBody CreateTeacherRequest body) { return service.createTeacher(body); }
}
