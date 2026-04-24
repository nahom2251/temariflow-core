package com.temariflow.repository;
import com.temariflow.entity.TeacherProfile; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface TeacherProfileRepository extends JpaRepository<TeacherProfile, UUID> { List<TeacherProfile> findBySchoolId(UUID schoolId); }
