package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "schools")
public class School extends BaseEntity {
  @Column(nullable = false) private String name;
  @Column(unique = true, nullable = false) private String code;
  private String phone;
  private String email;
  private String address;
  @Enumerated(EnumType.STRING) @Column(nullable = false) private SchoolStatus status;
  @ManyToOne(fetch = FetchType.LAZY) private SubscriptionPlan subscriptionPlan;
  private LocalDate trialEndsAt;
  private LocalDate subscriptionEndsAt;
  @Column(nullable = false) private boolean settingsEnabled;
}
