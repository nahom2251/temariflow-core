package com.temariflow.repository;
import com.temariflow.entity.Message; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface MessageRepository extends JpaRepository<Message, UUID> { List<Message> findBySchoolId(UUID schoolId); List<Message> findByRecipientId(UUID recipientId); }
