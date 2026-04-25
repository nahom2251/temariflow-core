package com.temariflow.repository;

import com.temariflow.entity.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, UUID> {
  List<SupportTicket> findBySchoolIdOrderByCreatedAtDesc(UUID schoolId);
  List<SupportTicket> findByStatusOrderByCreatedAtDesc(String status);
}
