package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="exams")
public class Exam extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @Column(nullable=false) private String name; @ManyToOne(fetch=FetchType.LAZY) private GradeLevel grade; private LocalDate startsAt; private LocalDate endsAt; }
