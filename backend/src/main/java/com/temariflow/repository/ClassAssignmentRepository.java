package com.temariflow.repository;
import com.temariflow.entity.ClassAssignment; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ClassAssignmentRepository extends JpaRepository<ClassAssignment, UUID> { List<ClassAssignment> findBySchoolId(UUID schoolId); }
