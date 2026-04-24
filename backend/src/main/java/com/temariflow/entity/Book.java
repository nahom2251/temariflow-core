package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="books")
public class Book extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @Column(nullable=false) private String title; private String author; private String isbn; private String category; private int totalCopies; private int availableCopies; @Enumerated(EnumType.STRING) private BookStatus status; }
