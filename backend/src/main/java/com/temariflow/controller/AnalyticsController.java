package com.temariflow.controller;

import com.temariflow.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
  private final AnalyticsService service;

  @GetMapping("/revenue")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','ACCOUNTANT','SUPER_ADMIN')")
  public Map<String, Object> revenue(@RequestParam(defaultValue = "12") int months) { return service.revenueTrend(months); }

  @GetMapping("/attendance")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER')")
  public Map<String, Object> attendance(@RequestParam(required = false) Integer year, @RequestParam(required = false) Integer month) {
    var now = LocalDate.now();
    return service.attendanceStats(year != null ? year : now.getYear(), month != null ? month : now.getMonthValue());
  }

  @GetMapping("/students/growth")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')")
  public Map<String, Object> growth() { return service.studentGrowth(); }

  @GetMapping("/results/pass-fail")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER')")
  public Map<String, Object> passFail() { return service.passFailRates(); }

  @GetMapping("/users/active")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')")
  public Map<String, Object> active() { return service.activeUsers(); }

  @GetMapping("/subscriptions")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public Map<String, Object> subs() { return service.subscriptionStats(); }
}
