package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="sections")
public class Section extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private GradeLevel grade; @Column(nullable=false) private String name; private int capacity; }
