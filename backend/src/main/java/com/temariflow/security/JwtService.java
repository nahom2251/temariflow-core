package com.temariflow.security;

import com.temariflow.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {
  @Value("${app.jwt.secret}") private String secret;
  @Value("${app.jwt.access-token-minutes}") private long accessMinutes;
  @Value("${app.jwt.refresh-token-days}") private long refreshDays;

  public String accessToken(User user) { return token(user, accessMinutes * 60, "access"); }
  public String refreshToken(User user) { return token(user, refreshDays * 24 * 60 * 60, "refresh"); }
  public Claims parse(String token) { return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8))).build().parseSignedClaims(token).getPayload(); }
  public boolean isAccess(String token) { return "access".equals(parse(token).get("typ", String.class)); }
  private String token(User user, long seconds, String type) {
    UUID schoolId = user.getSchool() == null ? null : user.getSchool().getId();
    var roles = user.getRoles().stream().map(r -> r.getName().name()).toList();
    return Jwts.builder().subject(user.getEmail()).claims(Map.of("uid", user.getId().toString(), "schoolId", schoolId == null ? "" : schoolId.toString(), "roles", roles, "typ", type)).issuedAt(new Date()).expiration(Date.from(Instant.now().plusSeconds(seconds))).signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8))).compact();
  }
}
