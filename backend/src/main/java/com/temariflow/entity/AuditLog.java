package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "audit_logs")
public class AuditLog extends BaseEntity {
  private UUID schoolId;
  private UUID actorUserId;
  @Column(nullable = false) private String action;
  @Column(length = 2000) private String details;
}
