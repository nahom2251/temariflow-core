package com.temariflow.service;

import com.temariflow.entity.School; import com.temariflow.exception.ApiException; import com.temariflow.repository.SchoolRepository; import com.temariflow.security.TenantContext; import lombok.RequiredArgsConstructor; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Component; import java.util.UUID;

@Component @RequiredArgsConstructor
public class ErpLookup {
  private final SchoolRepository schoolRepository;
  public UUID schoolId() { var id = TenantContext.getSchoolId(); if (id == null) throw new ApiException(HttpStatus.BAD_REQUEST, "No school tenant in token"); return id; }
  public School school() { return schoolRepository.findById(schoolId()).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "School not found")); }
}
