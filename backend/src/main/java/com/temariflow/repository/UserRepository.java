package com.temariflow.repository;

import com.temariflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String email);
  long countBySchoolId(UUID schoolId);
  Page<User> findBySchoolId(UUID schoolId, Pageable pageable);
  Page<User> findBySchoolIdAndFullNameContainingIgnoreCaseOrSchoolIdAndEmailContainingIgnoreCase(UUID schoolId1, String name, UUID schoolId2, String email, Pageable pageable);
}
