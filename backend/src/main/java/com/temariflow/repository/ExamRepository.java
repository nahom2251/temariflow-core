package com.temariflow.repository;
import com.temariflow.entity.Exam; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ExamRepository extends JpaRepository<Exam, UUID> { List<Exam> findBySchoolId(UUID schoolId); }
