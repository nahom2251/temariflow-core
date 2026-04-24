package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "users")
public class User extends BaseEntity {
  @ManyToOne(fetch = FetchType.LAZY) private School school;
  @Column(nullable = false) private String fullName;
  @Column(unique = true, nullable = false) private String email;
  @Column(nullable = false) private String passwordHash;
  @Column(nullable = false) private boolean enabled;
  private String otpCode;
  private Instant otpExpiresAt;
  private String refreshTokenHash;
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  @Builder.Default private Set<Role> roles = new HashSet<>();
}
