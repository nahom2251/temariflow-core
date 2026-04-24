package com.temariflow.repository;
import com.temariflow.entity.TeacherAttendance; import org.springframework.data.jpa.repository.JpaRepository; import java.time.LocalDate; import java.util.*;
public interface TeacherAttendanceRepository extends JpaRepository<TeacherAttendance, UUID> { List<TeacherAttendance> findBySchoolIdAndAttendanceDateBetween(UUID schoolId, LocalDate from, LocalDate to); }
