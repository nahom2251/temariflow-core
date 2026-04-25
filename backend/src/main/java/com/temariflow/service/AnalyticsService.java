package com.temariflow.service;

import com.temariflow.entity.*;
import com.temariflow.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class AnalyticsService {
  private final ErpLookup lookup;
  private final InvoiceRepository invoices;
  private final PaymentRepository payments;
  private final StudentProfileRepository students;
  private final UserRepository users;
  private final StudentAttendanceRepository attendance;
  private final ResultSummaryRepository results;
  private final SchoolRepository schools;

  public Map<String, Object> revenueTrend(int months) {
    var since = LocalDate.now().minusMonths(months).withDayOfMonth(1);
    var byMonth = invoices.findBySchoolId(lookup.schoolId()).stream()
        .filter(i -> i.getStatus() == InvoiceStatus.PAID && i.getDueDate() != null && !i.getDueDate().isBefore(since))
        .collect(Collectors.groupingBy(i -> YearMonth.from(i.getDueDate()).toString(),
            Collectors.reducing(BigDecimal.ZERO, Invoice::getAmount, BigDecimal::add)));
    return Map.of("series", byMonth);
  }

  public Map<String, Object> attendanceStats(int year, int month) {
    var from = LocalDate.of(year, month, 1);
    var to = from.withDayOfMonth(from.lengthOfMonth());
    var grouped = attendance.findBySchoolIdAndAttendanceDateBetween(lookup.schoolId(), from, to).stream()
        .collect(Collectors.groupingBy(StudentAttendance::getStatus, Collectors.counting()));
    long total = grouped.values().stream().mapToLong(Long::longValue).sum();
    return Map.of("total", total, "byStatus", grouped);
  }

  public Map<String, Object> studentGrowth() {
    var byMonth = students.findBySchoolId(lookup.schoolId()).stream()
        .collect(Collectors.groupingBy(s -> YearMonth.from(s.getCreatedAt().atZone(ZoneOffset.UTC).toLocalDate()).toString(),
            Collectors.counting()));
    return Map.of("series", new TreeMap<>(byMonth), "total", students.findBySchoolId(lookup.schoolId()).size());
  }

  public Map<String, Object> passFailRates() {
    var rs = results.findAll().stream().filter(r -> r.getSchool().getId().equals(lookup.schoolId())).toList();
    var grouped = rs.stream().collect(Collectors.groupingBy(ResultSummary::getDecision, Collectors.counting()));
    return Map.of("total", rs.size(), "byDecision", grouped);
  }

  public Map<String, Object> activeUsers() {
    var schoolId = lookup.schoolId();
    var all = users.findAll().stream().filter(u -> u.getSchool() != null && u.getSchool().getId().equals(schoolId)).toList();
    return Map.of("total", all.size(),
        "active", all.stream().filter(User::isEnabled).count(),
        "byRole", all.stream().flatMap(u -> u.getRoles().stream())
            .collect(Collectors.groupingBy(r -> r.getName().name(), Collectors.counting())));
  }

  public Map<String, Object> subscriptionStats() {
    var all = schools.findAll();
    return Map.of(
        "totalSchools", all.size(),
        "byStatus", all.stream().collect(Collectors.groupingBy(s -> String.valueOf(s.getStatus()), Collectors.counting())),
        "byPlan", all.stream().filter(s -> s.getSubscriptionPlan() != null)
            .collect(Collectors.groupingBy(s -> s.getSubscriptionPlan().getName(), Collectors.counting())),
        "approvedRevenue", payments.approvedRevenue()
    );
  }
}
