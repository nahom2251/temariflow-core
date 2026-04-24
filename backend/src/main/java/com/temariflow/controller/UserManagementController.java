package com.temariflow.controller;

import com.temariflow.dto.UserDto; import com.temariflow.entity.UserRole; import com.temariflow.service.UserManagementService; import lombok.RequiredArgsConstructor; import org.springframework.data.domain.*; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import java.util.UUID;

@RestController @RequestMapping("/api/users") @RequiredArgsConstructor @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','SUPER_ADMIN')")
public class UserManagementController {
  private final UserManagementService service;
  public record CreateUserBody(String fullName, String email, String password, UserRole role) {}
  @GetMapping public Page<UserDto> list(@RequestParam(required=false) String search, Pageable pageable) { return service.list(search, pageable); }
  @PostMapping public UserDto create(@RequestBody CreateUserBody body) { return service.create(body.fullName(), body.email(), body.password(), body.role()); }
  @PatchMapping("/{id}/status") public UserDto status(@PathVariable UUID id, @RequestParam boolean enabled) { return service.setStatus(id, enabled); }
  @DeleteMapping("/{id}") public void delete(@PathVariable UUID id) { service.delete(id); }
}
