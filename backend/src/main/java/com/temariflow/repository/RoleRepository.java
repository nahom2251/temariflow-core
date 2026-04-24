package com.temariflow.repository;

import com.temariflow.entity.Role;
import com.temariflow.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
  Optional<Role> findByName(UserRole name);
}
