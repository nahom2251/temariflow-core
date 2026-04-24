package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="fee_structures")
public class FeeStructure extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(fetch=FetchType.LAZY) private GradeLevel grade; @Column(nullable=false) private String name; @Column(nullable=false) private BigDecimal amount; }
