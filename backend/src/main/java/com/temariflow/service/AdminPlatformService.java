package com.temariflow.service;

import com.temariflow.dto.Phase3Dtos.*;
import com.temariflow.entity.*;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class AdminPlatformService {
  private final SupportTicketRepository tickets;
  private final GlobalAnnouncementRepository announcements;
  private final TranslationRepository translations;
  private final AuditLogRepository auditLogs;
  private final ErpLookup lookup;

  // Tickets
  public SupportTicket openTicket(TicketRequest r, UUID userId) {
    return tickets.save(SupportTicket.builder()
        .schoolId(safeSchoolId()).openedBy(userId)
        .subject(r.subject()).body(r.body())
        .priority(r.priority() == null ? "NORMAL" : r.priority())
        .status("OPEN").build());
  }
  public List<SupportTicket> myTickets() { return tickets.findBySchoolIdOrderByCreatedAtDesc(safeSchoolId()); }
  public List<SupportTicket> openTickets() { return tickets.findByStatusOrderByCreatedAtDesc("OPEN"); }
  public SupportTicket decide(UUID id, TicketDecision d) {
    var t = tickets.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Ticket not found"));
    t.setStatus(d.status()); if (d.resolution() != null) t.setResolution(d.resolution());
    return tickets.save(t);
  }

  // Global announcements
  public GlobalAnnouncement publishAnnouncement(GlobalAnnouncementRequest r) {
    return announcements.save(GlobalAnnouncement.builder()
        .title(r.title()).body(r.body()).audienceRole(r.audienceRole())
        .publishedAt(Instant.now()).active(r.active()).build());
  }
  public List<GlobalAnnouncement> activeAnnouncements() { return announcements.findByActiveTrueOrderByCreatedAtDesc(); }

  // Translations
  public Map<String, String> bundle(String locale) {
    return translations.findByLocale(locale).stream().collect(Collectors.toMap(Translation::getKey, Translation::getValue, (a,b) -> b));
  }
  public Translation upsertTranslation(TranslationRequest r) {
    var existing = translations.findByLocale(r.locale()).stream().filter(t -> t.getKey().equals(r.key())).findFirst();
    var t = existing.orElseGet(() -> Translation.builder().locale(r.locale()).key(r.key()).value(r.value()).build());
    t.setValue(r.value());
    return translations.save(t);
  }

  // Audit
  public List<AuditLog> auditForSchool() { return auditLogs.findBySchoolId(safeSchoolId()); }

  private UUID safeSchoolId() {
    try { return lookup.schoolId(); } catch (Exception e) { return null; }
  }
}
