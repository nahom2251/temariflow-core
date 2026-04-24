package com.temariflow.repository;
import com.temariflow.entity.GradeLevel; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface GradeLevelRepository extends JpaRepository<GradeLevel, UUID> { List<GradeLevel> findBySchoolId(UUID schoolId); }
