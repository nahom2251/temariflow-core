package com.temariflow.repository;
import com.temariflow.entity.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface StudentProfileRepository extends JpaRepository<StudentProfile, UUID> { List<StudentProfile> findBySchoolId(UUID schoolId); List<StudentProfile> findBySchoolIdAndGradeId(UUID schoolId, UUID gradeId); }
