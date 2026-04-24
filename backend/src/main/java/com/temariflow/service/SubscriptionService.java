package com.temariflow.service;

import com.temariflow.entity.*;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.SchoolRepository;
import com.temariflow.repository.SubscriptionPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service @RequiredArgsConstructor
public class SubscriptionService {
  private final SubscriptionPlanRepository planRepository;
  private final SchoolRepository schoolRepository;
  public SubscriptionPlan plan(PlanType type) { return planRepository.findByType(type).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Plan not found")); }
  public void assignTrial(School school) { var plan = plan(PlanType.FREE_TRIAL); school.setSubscriptionPlan(plan); school.setTrialEndsAt(LocalDate.now().plusDays(7)); school.setSubscriptionEndsAt(school.getTrialEndsAt()); }
  public School changePlan(School school, PlanType type) { school.setSubscriptionPlan(plan(type)); school.setSubscriptionEndsAt(LocalDate.now().plusMonths(1)); school.setStatus(SchoolStatus.ACTIVE); return schoolRepository.save(school); }
  public void suspendExpiredSchools() { schoolRepository.findAll().stream().filter(s -> s.getSubscriptionEndsAt() != null && s.getSubscriptionEndsAt().isBefore(LocalDate.now())).forEach(s -> { s.setStatus(SchoolStatus.SUSPENDED); schoolRepository.save(s); }); }
}
