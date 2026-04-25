package com.temariflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "stored_files")
public class StoredFile extends BaseEntity {
  @Column(nullable = false) private UUID schoolId;
  private UUID uploadedBy;
  @Column(nullable = false) private String category; // REPORT_CARD, ASSIGNMENT, NOTE, CERTIFICATE, RECEIPT, DOCUMENT
  @Column(nullable = false) private String filename;
  @Column(nullable = false) private String contentType;
  @Column(nullable = false) private long sizeBytes;
  @Column(nullable = false, length = 1000) private String storagePath;
  @Column(nullable = false, unique = true, length = 80) private String downloadToken;
  private String relatedEntityType;
  private UUID relatedEntityId;
}
