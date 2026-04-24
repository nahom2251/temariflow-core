package com.temariflow.validation;

import com.temariflow.security.TenantContext;
import java.util.UUID;

public final class SchoolTenantGuard {
  private SchoolTenantGuard() {}
  public static boolean canAccess(UUID schoolId) {
    var current = TenantContext.getSchoolId();
    return current == null || current.equals(schoolId);
  }
}
