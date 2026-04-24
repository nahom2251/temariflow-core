package com.temariflow.util;

import java.security.SecureRandom;

public final class CodeGenerator {
  private static final SecureRandom RANDOM = new SecureRandom();
  private CodeGenerator() {}
  public static String otp() { return String.valueOf(100000 + RANDOM.nextInt(900000)); }
  public static String schoolCode(String name) { return name.replaceAll("[^A-Za-z0-9]", "").toUpperCase().substring(0, Math.min(6, name.length())) + RANDOM.nextInt(1000, 9999); }
}
