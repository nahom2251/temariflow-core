package com.temariflow.controller;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.service.FinanceLibraryCommunicationService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.UUID;

@RestController @RequestMapping("/api/communication") @RequiredArgsConstructor
public class CommunicationController {
  private final FinanceLibraryCommunicationService service;
  @PostMapping("/announcements") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER')") public Announcement announce(@Valid @RequestBody AnnouncementRequest r) { return service.announce(r); }
  @PostMapping("/messages") public Message message(@RequestParam UUID senderId, @Valid @RequestBody MessageRequest r) { return service.message(senderId, r); }
  @PostMapping("/notifications/{recipientId}") @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER','ACCOUNTANT','LIBRARIAN')") public Notification notify(@PathVariable UUID recipientId, @RequestParam String title, @RequestParam String body) { return service.notify(recipientId, title, body); }
}
