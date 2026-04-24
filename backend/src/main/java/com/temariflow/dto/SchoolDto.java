package com.temariflow.dto;

import com.temariflow.entity.SchoolStatus;
import java.time.LocalDate;
import java.util.UUID;

public record SchoolDto(UUID id, String name, String code, String email, SchoolStatus status, LocalDate trialEndsAt, LocalDate subscriptionEndsAt) {}
