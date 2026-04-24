package com.temariflow.repository;
import com.temariflow.entity.StudentAttendance; import org.springframework.data.jpa.repository.JpaRepository; import java.time.LocalDate; import java.util.*;
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, UUID> { List<StudentAttendance> findBySchoolIdAndAttendanceDateBetween(UUID schoolId, LocalDate from, LocalDate to); }
