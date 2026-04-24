package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.service.*; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.*;

@RestController @RequestMapping("/api/academics") @RequiredArgsConstructor @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')")
public class AcademicController {
  private final AcademicService academic; private final SectionDistributionService distribution;
  @GetMapping("/grades") public List<GradeLevel> grades() { return academic.grades(); }
  @PostMapping("/grades") public GradeLevel grade(@Valid @RequestBody AcademicRequest r) { return academic.createGrade(r); }
  @PostMapping("/sections") public Section section(@Valid @RequestBody AcademicRequest r) { return academic.createSection(r); }
  @PostMapping("/subjects") public Subject subject(@Valid @RequestBody AcademicRequest r) { return academic.createSubject(r); }
  @PostMapping("/courses") public Course course(@Valid @RequestBody AcademicRequest r) { return academic.createCourse(r); }
  @PostMapping("/assignments") public ClassAssignment assignment(@Valid @RequestBody AcademicRequest r) { return academic.assign(r); }
  @PostMapping("/section-distribution") public Map<String, Long> distribute(@Valid @RequestBody DistributionRequest r) { return distribution.distribute(r); }
  @PatchMapping("/section-distribution/move") public StudentProfile move(@Valid @RequestBody ManualMoveRequest r) { return distribution.move(r); }
}
