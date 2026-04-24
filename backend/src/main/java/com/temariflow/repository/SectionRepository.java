package com.temariflow.repository;
import com.temariflow.entity.Section; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface SectionRepository extends JpaRepository<Section, UUID> { List<Section> findBySchoolId(UUID schoolId); List<Section> findBySchoolIdAndGradeId(UUID schoolId, UUID gradeId); }
