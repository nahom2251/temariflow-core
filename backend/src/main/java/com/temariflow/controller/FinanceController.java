package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.service.FinanceLibraryCommunicationService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/finance") @RequiredArgsConstructor @PreAuthorize("hasAnyRole('ACCOUNTANT','SCHOOL_OWNER','PRINCIPAL')")
public class FinanceController {
  private final FinanceLibraryCommunicationService service;
  @PostMapping("/invoices") public Invoice invoice(@Valid @RequestBody InvoiceRequest r) { return service.invoice(r); }
  @PostMapping("/expenses") public Expense expense(@Valid @RequestBody ExpenseRequest r) { return service.expense(r); }
  @PostMapping("/payroll") public PayrollRecord payroll(@Valid @RequestBody PayrollRequest r) { return service.payroll(r); }
}
