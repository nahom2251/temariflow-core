package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "support_tickets")
public class SupportTicket extends BaseEntity {
  private UUID schoolId;
  private UUID openedBy;
  @Column(nullable = false) private String subject;
  @Column(nullable = false, length = 4000) private String body;
  @Column(nullable = false) private String status;
  private String priority;
  @Column(length = 4000) private String resolution;
}
