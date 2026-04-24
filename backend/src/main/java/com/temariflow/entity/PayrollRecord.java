package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.time.YearMonth;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="payroll_records")
public class PayrollRecord extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private TeacherProfile teacher; private YearMonth payrollMonth; @Column(nullable=false) private BigDecimal grossSalary; private BigDecimal deductions; private BigDecimal netSalary; private boolean paid; }
