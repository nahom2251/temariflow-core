package com.temariflow.controller;

import com.temariflow.dto.SchoolDto;
import com.temariflow.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/api/schools") @RequiredArgsConstructor
public class SchoolController {
  private final SchoolService schoolService;
  @GetMapping("/me") public SchoolDto currentSchool() { return schoolService.currentSchool(); }
}
