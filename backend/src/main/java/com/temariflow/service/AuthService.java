package com.temariflow.service;

import com.temariflow.dto.AuthDtos.*;
import com.temariflow.entity.*;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.*;
import com.temariflow.security.JwtService;
import com.temariflow.util.CodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.Set;

@Service @RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final SchoolRepository schoolRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final SubscriptionService subscriptionService;

  public TokenResponse login(LoginRequest req) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
    var user = userRepository.findByEmail(req.email()).orElseThrow();
    return issue(user);
  }
  public TokenResponse refresh(RefreshRequest req) {
    var claims = jwtService.parse(req.refreshToken());
    var user = userRepository.findByEmail(claims.getSubject()).orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));
    return issue(user);
  }
  @Transactional public TokenResponse registerSchool(RegisterSchoolRequest req) {
    ensureEmailAvailable(req.email());
    var school = School.builder().name(req.schoolName()).code(CodeGenerator.schoolCode(req.schoolName())).email(req.email()).phone(req.phone()).status(SchoolStatus.PENDING).settingsEnabled(true).build();
    subscriptionService.assignTrial(school);
    schoolRepository.save(school);
    var owner = createUser(req.ownerName(), req.email(), req.password(), school, UserRole.SCHOOL_OWNER, false);
    return issue(owner);
  }
  @Transactional public void registerUser(RegisterUserRequest req) {
    ensureEmailAvailable(req.email());
    var school = req.schoolId() == null ? null : schoolRepository.findById(req.schoolId()).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "School not found"));
    createUser(req.fullName(), req.email(), req.password(), school, req.role(), true);
  }
  public void forgotPassword(ForgotPasswordRequest req) {
    userRepository.findByEmail(req.email()).ifPresent(user -> { user.setOtpCode(CodeGenerator.otp()); user.setOtpExpiresAt(Instant.now().plusSeconds(600)); userRepository.save(user); });
  }
  public void verifyOtp(VerifyOtpRequest req) { userRepository.findByEmail(req.email()).filter(u -> req.otp().equals(u.getOtpCode()) && u.getOtpExpiresAt().isAfter(Instant.now())).orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Invalid or expired OTP")); }
  public void resetPassword(ResetPasswordRequest req) { var user = userRepository.findByEmail(req.email()).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found")); if (!req.otp().equals(user.getOtpCode()) || user.getOtpExpiresAt().isBefore(Instant.now())) throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid or expired OTP"); user.setPasswordHash(passwordEncoder.encode(req.newPassword())); user.setOtpCode(null); userRepository.save(user); }
  private User createUser(String name, String email, String password, School school, UserRole roleName, boolean enabled) {
    var role = roleRepository.findByName(roleName).orElseThrow();
    return userRepository.save(User.builder().fullName(name).email(email).passwordHash(passwordEncoder.encode(password)).school(school).enabled(enabled).roles(Set.of(role)).build());
  }
  private TokenResponse issue(User user) { var access = jwtService.accessToken(user); var refresh = jwtService.refreshToken(user); user.setRefreshTokenHash(passwordEncoder.encode(refresh)); userRepository.save(user); return new TokenResponse(access, refresh, "Bearer"); }
  private void ensureEmailAvailable(String email) { if (userRepository.findByEmail(email).isPresent()) throw new ApiException(HttpStatus.CONFLICT, "Email already exists"); }
}
