package com.temariflow.mapper;

import com.temariflow.dto.UserDto;
import com.temariflow.entity.User;
import java.util.stream.Collectors;

public final class UserMapper {
  private UserMapper() {}
  public static UserDto toDto(User u) { return new UserDto(u.getId(), u.getSchool() == null ? null : u.getSchool().getId(), u.getFullName(), u.getEmail(), u.getRoles().stream().map(r -> r.getName()).collect(Collectors.toSet()), u.isEnabled()); }
}
