package com.temariflow.repository;

import com.temariflow.entity.Translation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TranslationRepository extends JpaRepository<Translation, UUID> {
  List<Translation> findByLocale(String locale);
}
