package com.temariflow.repository;

import com.temariflow.entity.User;
import com.temariflow.entity.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String email);
  long countBySchoolId(UUID schoolId);
  Page<User> findBySchoolId(UUID schoolId, Pageable pageable);
  Page<User> findBySchoolIdAndFullNameContainingIgnoreCaseOrSchoolIdAndEmailContainingIgnoreCase(UUID schoolId1, String name, UUID schoolId2, String email, Pageable pageable);

  @Query("select count(u) from User u join u.roles r where r.name = :role")
  long countByRoleName(UserRole role);

  @Query("select u from User u join u.roles r where r.name = :role and u.enabled = :enabled order by u.createdAt desc")
  List<User> findByRoleNameAndEnabled(UserRole role, boolean enabled);
}
