package com.temariflow.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
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

  @Async
  public void sendOtpEmail(String toEmail, String recipientName, String otp, String purpose) {
    String subject = "Your TemariFlow verification code";
    String safeName = (recipientName == null || recipientName.isBlank()) ? "there" : recipientName;
    String safePurpose = (purpose == null || purpose.isBlank()) ? "account verification" : purpose;
    String html = buildHtmlBody(safeName, otp, safePurpose);
    String text = buildPlainBody(safeName, otp, safePurpose);

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
      mailSender.send(message);
      log.info("OTP email sent to {} for {}", maskEmail(toEmail), safePurpose);
    } catch (MessagingException | MailException ex) {
      log.error("Failed to send OTP email to {}: {}", maskEmail(toEmail), ex.getMessage(), ex);
    } catch (Exception ex) {
      log.error("Unexpected error sending OTP email to {}: {}", maskEmail(toEmail), ex.getMessage(), ex);
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
    if (email == null) return "<null>";
    int at = email.indexOf('@');
    if (at <= 1) return "***" + (at >= 0 ? email.substring(at) : "");
    return email.charAt(0) + "***" + email.substring(at);
  }
}
