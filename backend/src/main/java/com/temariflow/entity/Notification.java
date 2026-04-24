package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="notifications")
public class Notification extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private User recipient; @Column(nullable=false) private String title; @Column(length=2000) private String body; private boolean read; }
