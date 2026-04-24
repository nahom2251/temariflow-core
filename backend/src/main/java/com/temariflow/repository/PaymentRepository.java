package com.temariflow.repository;

import com.temariflow.entity.Payment;
import com.temariflow.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
  List<Payment> findByStatus(PaymentStatus status);
  List<Payment> findBySchoolId(UUID schoolId);
  default BigDecimal approvedRevenue() {
    return findByStatus(PaymentStatus.APPROVED).stream().map(Payment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
