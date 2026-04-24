package com.temariflow.config;

import com.temariflow.entity.*;
import com.temariflow.repository.RoleRepository;
import com.temariflow.repository.SubscriptionPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.Arrays;

@Configuration @RequiredArgsConstructor
public class DataSeeder {
  private final RoleRepository roleRepository;
  private final SubscriptionPlanRepository planRepository;
  @Bean CommandLineRunner seedBaseData() { return args -> {
    Arrays.stream(UserRole.values()).forEach(role -> roleRepository.findByName(role).orElseGet(() -> roleRepository.save(Role.builder().name(role).build())));
    seedPlan(PlanType.FREE_TRIAL, "Free Trial", BigDecimal.ZERO, 100, 7);
    seedPlan(PlanType.STARTER, "Starter", new BigDecimal("29.00"), 300, 0);
    seedPlan(PlanType.STANDARD, "Standard", new BigDecimal("79.00"), 1000, 0);
    seedPlan(PlanType.PREMIUM, "Premium", new BigDecimal("149.00"), 5000, 0);
  }; }
  private void seedPlan(PlanType type, String name, BigDecimal price, int maxStudents, int trialDays) {
    planRepository.findByType(type).orElseGet(() -> planRepository.save(SubscriptionPlan.builder().type(type).name(name).monthlyPrice(price).maxStudents(maxStudents).trialDays(trialDays).build()));
  }
}
