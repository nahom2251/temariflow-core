package com.temariflow.repository;

import com.temariflow.entity.GlobalAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface GlobalAnnouncementRepository extends JpaRepository<GlobalAnnouncement, UUID> {
  List<GlobalAnnouncement> findByActiveTrueOrderByCreatedAtDesc();
}
