package com.temariflow.repository;

import com.temariflow.entity.StoredFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StoredFileRepository extends JpaRepository<StoredFile, UUID> {
  Optional<StoredFile> findByDownloadToken(String token);
  List<StoredFile> findBySchoolIdAndCategoryOrderByCreatedAtDesc(UUID schoolId, String category);
  List<StoredFile> findBySchoolIdOrderByCreatedAtDesc(UUID schoolId);
}
