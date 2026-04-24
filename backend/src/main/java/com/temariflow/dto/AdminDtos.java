package com.temariflow.dto;

import com.temariflow.entity.PlanType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public class AdminDtos {
  public record SchoolDecisionRequest(@NotNull boolean approved, String note) {}
  public record SchoolStatusRequest(@NotNull boolean active) {}
  public record ChangePlanRequest(@NotNull PlanType planType) {}
  public record PaymentDecisionRequest(@NotNull boolean approved, String note) {}
  public record PaymentUploadRequest(@NotNull UUID schoolId, @NotNull UUID planId, @NotNull BigDecimal amount, @NotBlank String receiptUrl) {}
  public record RevenueSummary(long schools, long users, BigDecimal revenue) {}
}
