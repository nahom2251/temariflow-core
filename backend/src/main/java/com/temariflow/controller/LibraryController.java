package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.service.FinanceLibraryCommunicationService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.UUID;

@RestController @RequestMapping("/api/library") @RequiredArgsConstructor @PreAuthorize("hasAnyRole('LIBRARIAN','SCHOOL_OWNER','PRINCIPAL')")
public class LibraryController {
  private final FinanceLibraryCommunicationService service;
  @PostMapping("/books") public Book book(@Valid @RequestBody BookRequest r) { return service.book(r); }
  @PostMapping("/borrows") public BookBorrow borrow(@Valid @RequestBody BorrowRequest r) { return service.borrow(r); }
  @PatchMapping("/borrows/{id}/return") public BookBorrow returnBook(@PathVariable UUID id) { return service.returnBook(id); }
}
