package com.temariflow.service;

import com.temariflow.dto.Phase3Dtos.PromotionRuleRequest;
import com.temariflow.entity.PromotionRule;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.PromotionRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class PromotionRuleService {
  private final PromotionRuleRepository repo;
  private final ErpLookup lookup;

  public PromotionRule current() {
    return repo.findBySchoolId(lookup.schoolId()).orElseGet(this::defaults);
  }

  private PromotionRule defaults() {
    return PromotionRule.builder()
        .schoolId(lookup.schoolId())
        .promotedMin(BigDecimal.valueOf(70))
        .probationMin(BigDecimal.valueOf(60)).probationMax(BigDecimal.valueOf(69.99))
        .repeatMin(BigDecimal.valueOf(50)).repeatMax(BigDecimal.valueOf(59.99))
        .dismissedBelow(BigDecimal.valueOf(50))
        .build();
  }

  public PromotionRule save(PromotionRuleRequest r) {
    validate(r);
    var existing = repo.findBySchoolId(lookup.schoolId()).orElseGet(() -> PromotionRule.builder().schoolId(lookup.schoolId()).build());
    existing.setPromotedMin(r.promotedMin());
    existing.setProbationMin(r.probationMin()); existing.setProbationMax(r.probationMax());
    existing.setRepeatMin(r.repeatMin()); existing.setRepeatMax(r.repeatMax());
    existing.setDismissedBelow(r.dismissedBelow());
    return repo.save(existing);
  }

  public PromotionRule update(UUID id, PromotionRuleRequest r) {
    var existing = repo.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Rule not found"));
    if (!existing.getSchoolId().equals(lookup.schoolId())) throw new ApiException(HttpStatus.FORBIDDEN, "Cross-tenant access");
    return save(r);
  }

  private void validate(PromotionRuleRequest r) {
    if (r.probationMax().compareTo(r.promotedMin()) >= 0)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Probation max must be below Promoted min");
    if (r.probationMin().compareTo(r.probationMax()) > 0)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Probation min cannot exceed Probation max");
    if (r.repeatMax().compareTo(r.probationMin()) >= 0)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Repeat max must be below Probation min");
    if (r.repeatMin().compareTo(r.repeatMax()) > 0)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Repeat min cannot exceed Repeat max");
    if (r.dismissedBelow().compareTo(r.repeatMin()) > 0)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Dismissed-below must be ≤ Repeat min");
  }

  public String decide(BigDecimal avg, PromotionRule rule) {
    if (avg.compareTo(rule.getPromotedMin()) >= 0) return "PROMOTED";
    if (avg.compareTo(rule.getProbationMin()) >= 0) return "PROMOTED_ON_PROBATION";
    if (avg.compareTo(rule.getRepeatMin()) >= 0) return "REPEAT_GRADE";
    return "DISMISSED";
  }
}
