package com.temariflow.controller;

import com.temariflow.dto.AdminDtos.*;
import com.temariflow.dto.SchoolDto;
import com.temariflow.entity.Payment;
import com.temariflow.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController @RequestMapping("/api/admin") @RequiredArgsConstructor
public class AdminController {
  private final AdminService adminService;
  @GetMapping("/schools") public List<SchoolDto> schools() { return adminService.schools(); }
  @PatchMapping("/schools/{id}/decision") public SchoolDto decideSchool(@PathVariable UUID id, @Valid @RequestBody SchoolDecisionRequest req) { return adminService.decideSchool(id, req); }
  @PatchMapping("/schools/{id}/activation") public SchoolDto activateSchool(@PathVariable UUID id, @Valid @RequestBody SchoolStatusRequest req) { return adminService.activate(id, req); }
  @PatchMapping("/schools/{id}/plan") public SchoolDto changePlan(@PathVariable UUID id, @Valid @RequestBody ChangePlanRequest req) { return adminService.changePlan(id, req); }
  @PostMapping("/payments") public Payment uploadPayment(@Valid @RequestBody PaymentUploadRequest req) { return adminService.uploadPayment(req); }
  @PatchMapping("/payments/{id}/verify") public Payment verifyPayment(@PathVariable UUID id, @Valid @RequestBody PaymentDecisionRequest req) { return adminService.verifyPayment(id, req); }
  @GetMapping("/summary") public RevenueSummary summary() { return adminService.summary(); }
}
