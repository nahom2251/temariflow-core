package com.temariflow.service;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;

  @Value("${app.mail.from:noreply@temariflow.com}")
  private String fromAddress;

  @Value("${app.mail.from-name:TemariFlow}")
  private String fromName;

  @Value("${spring.mail.username:}")
  private String configuredUsername;

  @Value("${spring.mail.host:}")
  private String configuredHost;

  @Value("${spring.mail.port:0}")
  private int configuredPort;

  @PostConstruct
  void logMailConfig() {
    log.info("=== TemariFlow Mail Configuration ===");
    log.info("MAIL_HOST       : {}", configuredHost.isBlank() ? "<MISSING>" : configuredHost);
    log.info("MAIL_PORT       : {}", configuredPort);
    log.info("MAIL_USERNAME   : {}", configuredUsername.isBlank() ? "<MISSING>" : maskEmail(configuredUsername));
    log.info("MAIL_FROM       : {} <{}>", fromName, fromAddress);
    if (configuredUsername.isBlank()) {
      log.warn("⚠ MAIL_USERNAME / MAIL_PASSWORD are not set. SMTP sending will FAIL. " +
          "Set MAIL_USERNAME and MAIL_PASSWORD env vars (Gmail requires an App Password).");
    }
    if (mailSender instanceof JavaMailSenderImpl impl) {
      log.info("JavaMailSender  : host={} port={} username={} protocol={}",
          impl.getHost(), impl.getPort(), maskEmail(impl.getUsername()), impl.getProtocol());
    }
    log.info("=====================================");
  }

  /** Async dispatch — used by registration / forgot-password flows. */
  @Async
  public void sendOtpEmail(String toEmail, String recipientName, String otp, String purpose) {
    sendOtpEmailSync(toEmail, recipientName, otp, purpose);
  }

  /**
   * Synchronous send — surfaces errors to the caller. Use from a /test-email endpoint
   * or anywhere you need confirmation that delivery actually succeeded.
   */
  public void sendOtpEmailSync(String toEmail, String recipientName, String otp, String purpose) {
    if (configuredUsername.isBlank()) {
      log.error("Refusing to send OTP email to {} — SMTP credentials not configured (MAIL_USERNAME / MAIL_PASSWORD missing).",
          maskEmail(toEmail));
      throw new IllegalStateException("SMTP credentials are not configured. Set MAIL_USERNAME and MAIL_PASSWORD environment variables.");
    }
    String subject = "Your TemariFlow verification code";
    String safeName = (recipientName == null || recipientName.isBlank()) ? "there" : recipientName;
    String safePurpose = (purpose == null || purpose.isBlank()) ? "account verification" : purpose;
    String html = buildHtmlBody(safeName, otp, safePurpose);
    String text = buildPlainBody(safeName, otp, safePurpose);

    log.info("→ Preparing OTP email to {} (purpose={}, host={}, port={})",
        maskEmail(toEmail), safePurpose, configuredHost, configuredPort);
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
      helper.setTo(toEmail);
      helper.setSubject(subject);
      try {
        helper.setFrom(new InternetAddress(fromAddress, fromName));
      } catch (UnsupportedEncodingException e) {
        helper.setFrom(fromAddress);
      }
      helper.setText(text, html);
      log.debug("→ Calling mailSender.send() for {}", maskEmail(toEmail));
      mailSender.send(message);
      log.info("✓ OTP email sent to {} for {}", maskEmail(toEmail), safePurpose);
    } catch (MessagingException ex) {
      log.error("✗ MessagingException sending OTP email to {}: {}", maskEmail(toEmail), ex.getMessage(), ex);
      throw new RuntimeException("Failed to send email: " + ex.getMessage(), ex);
    } catch (MailException ex) {
      log.error("✗ MailException sending OTP email to {} (check SMTP host/port/credentials): {}",
          maskEmail(toEmail), ex.getMessage(), ex);
      throw new RuntimeException("SMTP send failed: " + ex.getMessage(), ex);
    } catch (Exception ex) {
      log.error("✗ Unexpected error sending OTP email to {}: {}", maskEmail(toEmail), ex.getMessage(), ex);
      throw new RuntimeException("Unexpected email error: " + ex.getMessage(), ex);
    }
  }

  private String buildHtmlBody(String name, String otp, String purpose) {
    return "<!DOCTYPE html><html><body style=\"font-family:Arial,sans-serif;background:#f5f7fb;padding:24px;\">"
        + "<div style=\"max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);\">"
        + "<h2 style=\"color:#0f172a;margin:0 0 16px;\">TemariFlow</h2>"
        + "<p style=\"color:#334155;font-size:15px;\">Hi " + escape(name) + ",</p>"
        + "<p style=\"color:#334155;font-size:15px;\">Use the following one-time code to complete your " + escape(purpose) + ". This code expires in 10 minutes.</p>"
        + "<div style=\"font-size:32px;letter-spacing:8px;font-weight:bold;color:#1d4ed8;text-align:center;padding:20px;background:#eff6ff;border-radius:8px;margin:24px 0;\">"
        + escape(otp) + "</div>"
        + "<p style=\"color:#64748b;font-size:13px;\">If you did not request this, you can safely ignore this email.</p>"
        + "<p style=\"color:#94a3b8;font-size:12px;margin-top:32px;\">— TemariFlow Team</p>"
        + "</div></body></html>";
  }

  private String buildPlainBody(String name, String otp, String purpose) {
    return "Hi " + name + ",\n\nYour TemariFlow verification code for " + purpose + " is: " + otp
        + "\n\nThis code expires in 10 minutes.\n\nIf you did not request this, you can ignore this email.\n\n— TemariFlow Team";
  }

  private String escape(String s) {
    if (s == null) return "";
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  }

  private String maskEmail(String email) {
    if (email == null || email.isBlank()) return "<empty>";
    int at = email.indexOf('@');
    if (at <= 1) return "***" + (at >= 0 ? email.substring(at) : "");
    return email.charAt(0) + "***" + email.substring(at);
  }
}
