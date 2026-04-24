package com.temariflow.repository;
import com.temariflow.entity.Announcement; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> { List<Announcement> findBySchoolId(UUID schoolId); }
