package com.temariflow.service;

import com.temariflow.dto.AdminDtos.*;
import com.temariflow.dto.SchoolDto;
import com.temariflow.entity.*;
import com.temariflow.exception.ApiException;
import com.temariflow.mapper.SchoolMapper;
import com.temariflow.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class AdminService {
  private final SchoolRepository schoolRepository;
  private final PaymentRepository paymentRepository;
  private final SubscriptionPlanRepository planRepository;
  private final UserRepository userRepository;
  private final SubscriptionService subscriptionService;

  public List<SchoolDto> schools() { return schoolRepository.findAll().stream().map(SchoolMapper::toDto).toList(); }
  public SchoolDto decideSchool(UUID id, SchoolDecisionRequest req) { var s = school(id); s.setStatus(req.approved() ? SchoolStatus.ACTIVE : SchoolStatus.REJECTED); return SchoolMapper.toDto(schoolRepository.save(s)); }
  public SchoolDto activate(UUID id, SchoolStatusRequest req) { var s = school(id); s.setStatus(req.active() ? SchoolStatus.ACTIVE : SchoolStatus.INACTIVE); return SchoolMapper.toDto(schoolRepository.save(s)); }
  public SchoolDto changePlan(UUID id, ChangePlanRequest req) { return SchoolMapper.toDto(subscriptionService.changePlan(school(id), req.planType())); }
  public Payment uploadPayment(PaymentUploadRequest req) { var school = school(req.schoolId()); var plan = planRepository.findById(req.planId()).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Plan not found")); return paymentRepository.save(Payment.builder().school(school).plan(plan).amount(req.amount()).receiptUrl(req.receiptUrl()).status(PaymentStatus.PENDING_VERIFICATION).build()); }
  public Payment verifyPayment(UUID paymentId, PaymentDecisionRequest req) { var p = paymentRepository.findById(paymentId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Payment not found")); p.setStatus(req.approved() ? PaymentStatus.APPROVED : PaymentStatus.REJECTED); p.setReviewerNote(req.note()); if (req.approved()) subscriptionService.changePlan(p.getSchool(), p.getPlan().getType()); return paymentRepository.save(p); }
  public RevenueSummary summary() { return new RevenueSummary(schoolRepository.count(), userRepository.count(), paymentRepository.approvedRevenue()); }
  private School school(UUID id) { return schoolRepository.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "School not found")); }
}
