package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="subjects")
public class Subject extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @Column(nullable=false) private String name; @Column(nullable=false) private String code; }
