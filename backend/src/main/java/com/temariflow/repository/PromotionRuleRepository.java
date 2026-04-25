package com.temariflow.repository;

import com.temariflow.entity.PromotionRule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PromotionRuleRepository extends JpaRepository<PromotionRule, UUID> {
  Optional<PromotionRule> findBySchoolId(UUID schoolId);
}
