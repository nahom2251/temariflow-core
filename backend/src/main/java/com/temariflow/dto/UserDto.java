package com.temariflow.dto;

import com.temariflow.entity.UserRole;
import java.util.Set;
import java.util.UUID;

public record UserDto(UUID id, UUID schoolId, String fullName, String email, Set<UserRole> roles, boolean enabled) {}
