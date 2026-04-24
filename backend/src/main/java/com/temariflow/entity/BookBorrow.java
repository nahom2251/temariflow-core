package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="book_borrows")
public class BookBorrow extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Book book; @ManyToOne(optional=false, fetch=FetchType.LAZY) private StudentProfile borrower; private LocalDate borrowedAt; private LocalDate dueAt; private LocalDate returnedAt; private BigDecimal fineAmount; @Enumerated(EnumType.STRING) private BorrowStatus status; }
