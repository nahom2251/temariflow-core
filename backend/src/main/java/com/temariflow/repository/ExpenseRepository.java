package com.temariflow.repository;
import com.temariflow.entity.Expense; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ExpenseRepository extends JpaRepository<Expense, UUID> { List<Expense> findBySchoolId(UUID schoolId); }
