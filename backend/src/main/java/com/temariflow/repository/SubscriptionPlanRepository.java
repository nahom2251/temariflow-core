package com.temariflow.repository;

import com.temariflow.entity.PlanType;
import com.temariflow.entity.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, UUID> {
  Optional<SubscriptionPlan> findByType(PlanType type);
}
