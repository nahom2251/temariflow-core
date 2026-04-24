package com.temariflow.repository;
import com.temariflow.entity.MarkEntry; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface MarkEntryRepository extends JpaRepository<MarkEntry, UUID> { List<MarkEntry> findBySchoolIdAndExamId(UUID schoolId, UUID examId); }
