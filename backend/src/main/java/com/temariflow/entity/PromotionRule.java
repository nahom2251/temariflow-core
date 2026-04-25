package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "promotion_rules", uniqueConstraints = @UniqueConstraint(columnNames = "school_id"))
public class PromotionRule extends BaseEntity {
  @Column(name = "school_id", nullable = false) private UUID schoolId;
  @Column(nullable = false) private BigDecimal promotedMin;
  @Column(nullable = false) private BigDecimal probationMin;
  @Column(nullable = false) private BigDecimal probationMax;
  @Column(nullable = false) private BigDecimal repeatMin;
  @Column(nullable = false) private BigDecimal repeatMax;
  @Column(nullable = false) private BigDecimal dismissedBelow;
}
