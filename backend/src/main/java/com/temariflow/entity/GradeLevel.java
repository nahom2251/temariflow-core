package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="grade_levels")
public class GradeLevel extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @Column(nullable=false) private String name; private int sortOrder; }
