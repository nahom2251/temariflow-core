package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "roles")
public class Role extends BaseEntity {
  @Enumerated(EnumType.STRING) @Column(unique = true, nullable = false)
  private UserRole name;
}
