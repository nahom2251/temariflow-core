package com.temariflow.dto;

import com.temariflow.entity.UserRole;
import jakarta.validation.constraints.*;
import java.util.UUID;

public class AuthDtos {
  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
  public record RegisterUserRequest(@NotBlank String fullName, @Email @NotBlank String email, @NotBlank @Size(min = 8) String password, UUID schoolId, @NotNull UserRole role) {}
  public record RegisterSchoolRequest(@NotBlank String schoolName, @NotBlank String ownerName, @Email @NotBlank String email, @NotBlank @Size(min = 8) String password, String phone) {}
  public record TokenResponse(String accessToken, String refreshToken, String tokenType) {}
  public record RefreshRequest(@NotBlank String refreshToken) {}
  public record ForgotPasswordRequest(@Email @NotBlank String email) {}
  public record VerifyOtpRequest(@Email @NotBlank String email, @NotBlank String otp) {}
  public record ResetPasswordRequest(@Email @NotBlank String email, @NotBlank String otp, @NotBlank @Size(min = 8) String newPassword) {}
}
