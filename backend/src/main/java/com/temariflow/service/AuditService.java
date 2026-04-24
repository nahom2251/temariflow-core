package com.temariflow.service;

import com.temariflow.entity.AuditLog;
import com.temariflow.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class AuditService {
  private final AuditLogRepository auditLogRepository;
  public void log(UUID schoolId, UUID actorId, String action, String details) { auditLogRepository.save(AuditLog.builder().schoolId(schoolId).actorUserId(actorId).action(action).details(details).build()); }
}
