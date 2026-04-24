package com.temariflow.mapper;

import com.temariflow.dto.SchoolDto;
import com.temariflow.entity.School;

public final class SchoolMapper {
  private SchoolMapper() {}
  public static SchoolDto toDto(School s) { return new SchoolDto(s.getId(), s.getName(), s.getCode(), s.getEmail(), s.getStatus(), s.getTrialEndsAt(), s.getSubscriptionEndsAt()); }
}
