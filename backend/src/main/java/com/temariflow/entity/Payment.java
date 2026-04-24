package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "payments")
public class Payment extends BaseEntity {
  @ManyToOne(optional = false, fetch = FetchType.LAZY) private School school;
  @ManyToOne(optional = false, fetch = FetchType.LAZY) private SubscriptionPlan plan;
  @Column(nullable = false) private BigDecimal amount;
  private String receiptUrl;
  @Enumerated(EnumType.STRING) @Column(nullable = false) private PaymentStatus status;
  private String reviewerNote;
}
