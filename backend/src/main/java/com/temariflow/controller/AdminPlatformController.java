package com.temariflow.controller;

import com.temariflow.dto.Phase3Dtos.*;
import com.temariflow.entity.*;
import com.temariflow.security.TenantContext;
import com.temariflow.service.AdminPlatformService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/platform")
@RequiredArgsConstructor
public class AdminPlatformController {
  private final AdminPlatformService service;

  // ---- Support Tickets ----
  @PostMapping("/tickets")
  @PreAuthorize("isAuthenticated()")
  public SupportTicket openTicket(@RequestBody @Valid TicketRequest r) {
    return service.openTicket(r, TenantContext.getUserId());
  }

  @GetMapping("/tickets/mine")
  @PreAuthorize("isAuthenticated()")
  public List<SupportTicket> mine() { return service.myTickets(); }

  @GetMapping("/tickets/open")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public List<SupportTicket> open() { return service.openTickets(); }

  @PutMapping("/tickets/{id}")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public SupportTicket decide(@PathVariable UUID id, @RequestBody @Valid TicketDecision d) { return service.decide(id, d); }

  // ---- Global Announcements ----
  @PostMapping("/announcements")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public GlobalAnnouncement publish(@RequestBody @Valid GlobalAnnouncementRequest r) { return service.publishAnnouncement(r); }

  @GetMapping("/announcements")
  public List<GlobalAnnouncement> active() { return service.activeAnnouncements(); }

  // ---- Translations ----
  @GetMapping("/translations/{locale}")
  public Map<String, String> bundle(@PathVariable String locale) { return service.bundle(locale); }

  @PostMapping("/translations")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public Translation upsert(@RequestBody @Valid TranslationRequest r) { return service.upsertTranslation(r); }

  // ---- Audit ----
  @GetMapping("/audit")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','SUPER_ADMIN')")
  public List<AuditLog> audit() { return service.auditForSchool(); }
}
