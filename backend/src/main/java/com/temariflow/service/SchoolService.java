package com.temariflow.service;

import com.temariflow.dto.SchoolDto;
import com.temariflow.exception.ApiException;
import com.temariflow.mapper.SchoolMapper;
import com.temariflow.repository.SchoolRepository;
import com.temariflow.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class SchoolService {
  private final SchoolRepository schoolRepository;
  public SchoolDto currentSchool() {
    var schoolId = TenantContext.getSchoolId();
    if (schoolId == null) throw new ApiException(HttpStatus.BAD_REQUEST, "No school tenant in token");
    return schoolRepository.findById(schoolId).map(SchoolMapper::toDto).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "School not found"));
  }
}
