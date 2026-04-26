package com.temariflow.controller;

import com.temariflow.service.EmailService;
import com.temariflow.util.CodeGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Temporary diagnostic endpoint to verify SMTP delivery end-to-end.
 * Sends a sample OTP synchronously so any error is returned in the HTTP response.
 *
 * Usage:  POST /api/auth/test-email?to=you@example.com
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MailDiagnosticsController {

  private final EmailService emailService;

  @PostMapping("/test-email")
  public Map<String, Object> testEmail(@RequestParam("to") String to,
                                       @RequestParam(value = "name", required = false) String name) {
    String otp = CodeGenerator.otp();
    Map<String, Object> result = new HashMap<>();
    result.put("recipient", to);
    result.put("otp", otp);
    try {
      emailService.sendOtpEmailSync(to, name == null ? "Tester" : name, otp, "SMTP diagnostic");
      result.put("status", "sent");
      result.put("message", "Email dispatched successfully. Check inbox + spam folder.");
    } catch (Exception ex) {
      log.error("Test email failed: {}", ex.getMessage(), ex);
      result.put("status", "failed");
      result.put("error", ex.getMessage());
      result.put("hint", "If error mentions auth/credentials, set MAIL_USERNAME and MAIL_PASSWORD env vars. " +
          "For Gmail you MUST use an App Password (https://myaccount.google.com/apppasswords), not your normal password.");
    }
    return result;
  }
}
