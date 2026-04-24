package com.temariflow.repository;
import com.temariflow.entity.Invoice; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> { List<Invoice> findBySchoolId(UUID schoolId); }
