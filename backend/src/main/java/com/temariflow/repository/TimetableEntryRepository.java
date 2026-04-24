package com.temariflow.repository;
import com.temariflow.entity.TimetableEntry; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, UUID> { List<TimetableEntry> findBySchoolId(UUID schoolId); }
