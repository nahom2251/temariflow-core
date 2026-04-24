package com.temariflow.repository;
import com.temariflow.entity.FeeStructure; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface FeeStructureRepository extends JpaRepository<FeeStructure, UUID> { List<FeeStructure> findBySchoolId(UUID schoolId); }
