package com.temariflow.controller;

import com.temariflow.dto.Phase3Dtos.PromotionRuleRequest;
import com.temariflow.entity.PromotionRule;
import com.temariflow.service.PromotionRuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/promotion-rules")
@RequiredArgsConstructor
public class PromotionRuleController {
  private final PromotionRuleService service;

  @GetMapping
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL','TEACHER')")
  public PromotionRule get() { return service.current(); }

  @PostMapping
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')")
  public PromotionRule create(@RequestBody @Valid PromotionRuleRequest body) { return service.save(body); }

  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('SCHOOL_OWNER','PRINCIPAL')")
  public PromotionRule update(@PathVariable UUID id, @RequestBody @Valid PromotionRuleRequest body) { return service.update(id, body); }
}
