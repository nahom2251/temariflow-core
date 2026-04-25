package com.temariflow.security;

import java.util.UUID;

public final class TenantContext {
  private static final ThreadLocal<UUID> SCHOOL_ID = new ThreadLocal<>();
  private static final ThreadLocal<UUID> USER_ID = new ThreadLocal<>();
  private TenantContext() {}
  public static void setSchoolId(UUID schoolId) { SCHOOL_ID.set(schoolId); }
  public static UUID getSchoolId() { return SCHOOL_ID.get(); }
  public static void setUserId(UUID userId) { USER_ID.set(userId); }
  public static UUID getUserId() { return USER_ID.get(); }
  public static void clear() { SCHOOL_ID.remove(); USER_ID.remove(); }
}
