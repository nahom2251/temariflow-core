package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="mark_entries")
public class MarkEntry extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Exam exam; @ManyToOne(optional=false, fetch=FetchType.LAZY) private StudentProfile student; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Subject subject; @Column(nullable=false) private BigDecimal mark; @Column(nullable=false) private BigDecimal maxMark; }
