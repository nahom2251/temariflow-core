package com.temariflow.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class RateLimitFilter implements Filter {
  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
  private static final int CAPACITY = 120; // 120 requests
  private static final Duration WINDOW = Duration.ofMinutes(1);

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    var request = (HttpServletRequest) req;
    var response = (HttpServletResponse) res;
    var path = request.getRequestURI();
    if (path == null || path.startsWith("/swagger") || path.startsWith("/v3/api-docs") || path.startsWith("/actuator")) {
      chain.doFilter(req, res); return;
    }
    var ip = clientIp(request);
    var bucket = buckets.computeIfAbsent(ip, k -> Bucket.builder().addLimit(Bandwidth.builder().capacity(CAPACITY).refillGreedy(CAPACITY, WINDOW).build()).build());
    if (bucket.tryConsume(1)) {
      chain.doFilter(req, res);
    } else {
      response.setStatus(429);
      response.setContentType("application/json");
      response.getWriter().write("{\"status\":429,\"message\":\"Rate limit exceeded\"}");
    }
  }

  private String clientIp(HttpServletRequest request) {
    var forwarded = request.getHeader("X-Forwarded-For");
    if (forwarded != null && !forwarded.isBlank()) return forwarded.split(",")[0].trim();
    return request.getRemoteAddr();
  }
}
