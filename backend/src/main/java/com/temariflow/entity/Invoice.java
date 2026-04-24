package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="invoices")
public class Invoice extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private StudentProfile student; @Column(nullable=false) private String invoiceNumber; @Column(nullable=false) private BigDecimal amount; private BigDecimal paidAmount; private LocalDate dueDate; @Enumerated(EnumType.STRING) private InvoiceStatus status; }
