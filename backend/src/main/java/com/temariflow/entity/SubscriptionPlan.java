package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "subscription_plans")
public class SubscriptionPlan extends BaseEntity {
  @Enumerated(EnumType.STRING) @Column(unique = true, nullable = false) private PlanType type;
  @Column(nullable = false) private String name;
  @Column(nullable = false) private BigDecimal monthlyPrice;
  private int maxStudents;
  private int trialDays;
}
