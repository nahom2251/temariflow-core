package com.temariflow.repository;
import com.temariflow.entity.Course; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface CourseRepository extends JpaRepository<Course, UUID> { List<Course> findBySchoolId(UUID schoolId); }
