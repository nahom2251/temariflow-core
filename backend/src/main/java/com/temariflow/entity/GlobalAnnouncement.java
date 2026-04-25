package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "global_announcements")
public class GlobalAnnouncement extends BaseEntity {
  @Column(nullable = false) private String title;
  @Column(nullable = false, length = 4000) private String body;
  private String audienceRole; // null = all
  private Instant publishedAt;
  private boolean active;
}
