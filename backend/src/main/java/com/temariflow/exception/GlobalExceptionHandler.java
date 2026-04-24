package com.temariflow.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ApiException.class)
  ResponseEntity<?> api(ApiException ex) { return ResponseEntity.status(ex.getStatus()).body(body(ex.getStatus(), ex.getMessage())); }
  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<?> validation(MethodArgumentNotValidException ex) {
    var errors = ex.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (a,b) -> a));
    return ResponseEntity.badRequest().body(Map.of("timestamp", Instant.now(), "status", 400, "message", "Validation failed", "errors", errors));
  }
  @ExceptionHandler(Exception.class)
  ResponseEntity<?> generic(Exception ex) { return ResponseEntity.status(500).body(body(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error")); }
  private Map<String, Object> body(HttpStatus status, String message) { return Map.of("timestamp", Instant.now(), "status", status.value(), "message", message); }
}
