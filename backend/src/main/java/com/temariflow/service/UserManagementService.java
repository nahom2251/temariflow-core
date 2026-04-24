package com.temariflow.service;

import com.temariflow.dto.UserDto; import com.temariflow.entity.*; import com.temariflow.exception.ApiException; import com.temariflow.mapper.UserMapper; import com.temariflow.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.data.domain.*; import org.springframework.http.HttpStatus; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service; import java.util.*;

@Service @RequiredArgsConstructor
public class UserManagementService {
  private final UserRepository users; private final RoleRepository roles; private final PasswordEncoder encoder; private final ErpLookup lookup;
  public Page<UserDto> list(String search, Pageable pageable) { var sid = lookup.schoolId(); var page = (search == null || search.isBlank()) ? users.findBySchoolId(sid, pageable) : users.findBySchoolIdAndFullNameContainingIgnoreCaseOrSchoolIdAndEmailContainingIgnoreCase(sid, search, sid, search, pageable); return page.map(UserMapper::toDto); }
  public UserDto create(String name, String email, String password, UserRole roleName) { if (users.findByEmail(email).isPresent()) throw new ApiException(HttpStatus.CONFLICT, "Email already exists"); var role = roles.findByName(roleName).orElseThrow(); var user = User.builder().school(lookup.school()).fullName(name).email(email).passwordHash(encoder.encode(password == null ? "ChangeMe123!" : password)).enabled(true).roles(Set.of(role)).build(); return UserMapper.toDto(users.save(user)); }
  public UserDto setStatus(UUID id, boolean enabled) { var user = users.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found")); user.setEnabled(enabled); return UserMapper.toDto(users.save(user)); }
  public void delete(UUID id) { users.deleteById(id); }
}
