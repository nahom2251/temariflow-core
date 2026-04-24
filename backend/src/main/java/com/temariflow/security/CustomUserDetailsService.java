package com.temariflow.security;

import com.temariflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;
  @Override public UserDetails loadUserByUsername(String email) {
    var user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    var authorities = user.getRoles().stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName().name())).toList();
    return org.springframework.security.core.userdetails.User.withUsername(user.getEmail()).password(user.getPasswordHash()).disabled(!user.isEnabled()).authorities(authorities).build();
  }
}
