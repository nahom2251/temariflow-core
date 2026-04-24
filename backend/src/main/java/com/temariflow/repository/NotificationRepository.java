package com.temariflow.repository;
import com.temariflow.entity.Notification; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface NotificationRepository extends JpaRepository<Notification, UUID> { List<Notification> findBySchoolId(UUID schoolId); List<Notification> findByRecipientId(UUID recipientId); }
