package com.temariflow.service;

import com.temariflow.entity.StoredFile;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.StoredFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class FileStorageService {
  @Value("${app.storage.path:./storage}") private String storageRoot;
  private final StoredFileRepository repo;
  private final ErpLookup lookup;

  public StoredFile store(String category, String filename, String contentType, byte[] data, String relatedType, UUID relatedId) {
    try {
      var schoolId = lookup.schoolId();
      var dir = Paths.get(storageRoot, schoolId.toString(), category);
      Files.createDirectories(dir);
      var safe = sanitize(filename);
      var path = dir.resolve(UUID.randomUUID() + "_" + safe);
      Files.write(path, data);
      var token = UUID.randomUUID().toString().replace("-", "") + Long.toHexString(System.nanoTime());
      return repo.save(StoredFile.builder()
          .schoolId(schoolId).category(category).filename(safe)
          .contentType(contentType == null ? "application/octet-stream" : contentType)
          .sizeBytes(data.length).storagePath(path.toString())
          .downloadToken(token).relatedEntityType(relatedType).relatedEntityId(relatedId)
          .build());
    } catch (IOException e) {
      throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Storage failure: " + e.getMessage());
    }
  }

  public byte[] read(StoredFile f) {
    try { return Files.readAllBytes(Paths.get(f.getStoragePath())); }
    catch (IOException e) { throw new ApiException(HttpStatus.NOT_FOUND, "File missing"); }
  }

  public StoredFile byToken(String token) {
    return repo.findByDownloadToken(token).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Invalid download token"));
  }

  public StoredFile byId(UUID id) {
    var f = repo.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "File not found"));
    if (!f.getSchoolId().equals(lookup.schoolId())) throw new ApiException(HttpStatus.FORBIDDEN, "Cross-tenant access");
    return f;
  }

  private String sanitize(String name) {
    if (name == null) return "file";
    return name.replaceAll("[\\\\/:*?\"<>|]", "_").replaceAll("\\s+", "_");
  }
}
