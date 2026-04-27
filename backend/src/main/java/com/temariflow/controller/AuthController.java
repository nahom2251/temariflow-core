package com.temariflow.controller;

import com.temariflow.dto.AuthDtos.*;
import com.temariflow.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth") @RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;
  @PostMapping("/login") public TokenResponse login(@Valid @RequestBody LoginRequest req) { return authService.login(req); }
  @PostMapping("/refresh") public TokenResponse refresh(@Valid @RequestBody RefreshRequest req) { return authService.refresh(req); }
  @PostMapping("/register-school") @ResponseStatus(HttpStatus.CREATED) public TokenResponse registerSchool(@Valid @RequestBody RegisterSchoolRequest req) { return authService.registerSchool(req); }
  @PostMapping("/register-super-admin") @ResponseStatus(HttpStatus.CREATED) public SuperAdminSignupResponse registerSuperAdmin(@Valid @RequestBody RegisterSuperAdminRequest req) { return authService.registerSuperAdmin(req); }
  @PostMapping("/register-user") @ResponseStatus(HttpStatus.CREATED) public void registerUser(@Valid @RequestBody RegisterUserRequest req) { authService.registerUser(req); }
  @PostMapping("/forgot-password") public void forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) { authService.forgotPassword(req); }
  @PostMapping("/verify-otp") public void verifyOtp(@Valid @RequestBody VerifyOtpRequest req) { authService.verifyOtp(req); }
  @PostMapping("/reset-password") public void resetPassword(@Valid @RequestBody ResetPasswordRequest req) { authService.resetPassword(req); }
}
