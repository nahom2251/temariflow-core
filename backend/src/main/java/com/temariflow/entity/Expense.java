package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="expenses")
public class Expense extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @Column(nullable=false) private String category; @Column(nullable=false) private BigDecimal amount; private LocalDate expenseDate; private String note; }
