package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="class_assignments")
public class ClassAssignment extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private TeacherProfile teacher; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Section section; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Subject subject; }
