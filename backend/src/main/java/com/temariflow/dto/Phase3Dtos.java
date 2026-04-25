package com.temariflow.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.UUID;

public class Phase3Dtos {
  public record PromotionRuleRequest(
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal promotedMin,
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal probationMin,
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal probationMax,
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal repeatMin,
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal repeatMax,
      @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal dismissedBelow
  ) {}

  public record TicketRequest(@NotBlank String subject, @NotBlank String body, String priority) {}
  public record TicketDecision(@NotBlank String status, String resolution) {}

  public record GlobalAnnouncementRequest(@NotBlank String title, @NotBlank String body, String audienceRole, boolean active) {}

  public record TranslationRequest(@NotBlank String locale, @NotBlank String key, @NotBlank String value) {}

  public record TeacherCommentRequest(@NotNull UUID examId, @NotNull UUID studentId, @NotBlank String comment) {}
}
