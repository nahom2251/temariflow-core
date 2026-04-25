package com.temariflow.controller;

import com.temariflow.repository.SchoolRepository;
import com.temariflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {
  private final SchoolRepository schools;
  private final UserRepository users;

  @GetMapping
  public Map<String, Object> health() {
    long startedAt = System.currentTimeMillis();
    boolean dbOk;
    try { schools.count(); users.count(); dbOk = true; } catch (Exception e) { dbOk = false; }
    return Map.of(
        "status", dbOk ? "UP" : "DEGRADED",
        "timestamp", Instant.now().toString(),
        "database", dbOk ? "OK" : "ERROR",
        "uptimeMs", System.currentTimeMillis() - startedAt
    );
  }
}
