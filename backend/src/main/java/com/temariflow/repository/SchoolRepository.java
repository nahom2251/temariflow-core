package com.temariflow.repository;

import com.temariflow.entity.School;
import com.temariflow.entity.SchoolStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID> {
  Optional<School> findByCode(String code);
  List<School> findByStatus(SchoolStatus status);
}
