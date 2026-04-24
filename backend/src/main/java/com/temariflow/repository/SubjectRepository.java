package com.temariflow.repository;
import com.temariflow.entity.Subject; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface SubjectRepository extends JpaRepository<Subject, UUID> { List<Subject> findBySchoolId(UUID schoolId); }
