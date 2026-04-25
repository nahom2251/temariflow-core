package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "translations", uniqueConstraints = @UniqueConstraint(columnNames = {"locale", "translation_key"}))
public class Translation extends BaseEntity {
  @Column(nullable = false, length = 8) private String locale;
  @Column(name = "translation_key", nullable = false, length = 200) private String key;
  @Column(nullable = false, length = 2000) private String value;
}
