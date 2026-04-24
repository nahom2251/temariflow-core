package com.temariflow.repository;
import com.temariflow.entity.PayrollRecord; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface PayrollRecordRepository extends JpaRepository<PayrollRecord, UUID> { List<PayrollRecord> findBySchoolId(UUID schoolId); }
