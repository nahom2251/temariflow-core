package com.temariflow.repository;
import com.temariflow.entity.ResultSummary; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ResultSummaryRepository extends JpaRepository<ResultSummary, UUID> { List<ResultSummary> findBySchoolIdAndExamId(UUID schoolId, UUID examId); }
