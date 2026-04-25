package com.temariflow.controller;

import com.temariflow.entity.ResultSummary;
import com.temariflow.entity.StoredFile;
import com.temariflow.repository.ResultSummaryRepository;
import com.temariflow.service.FileStorageService;
import com.temariflow.service.ReportCardService;
import com.temariflow.service.ErpLookup;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
  private final FileStorageService storage;
  private final ReportCardService reportCards;
  private final ResultSummaryRepository summaries;
  private final ErpLookup lookup;
  private static final java.util.Set<String> ALLOWED_CATEGORIES =
      java.util.Set.of("REPORT_CARD","ASSIGNMENT","NOTE","CERTIFICATE","RECEIPT","DOCUMENT");
  private static final long MAX_BYTES = 25L * 1024 * 1024; // 25 MB

  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER','ACCOUNTANT','LIBRARIAN')")
  public StoredFile upload(@RequestParam("file") MultipartFile file,
                           @RequestParam("category") String category,
                           @RequestParam(value = "relatedType", required = false) String relatedType,
                           @RequestParam(value = "relatedId", required = false) UUID relatedId) throws IOException {
    var cat = category == null ? "" : category.toUpperCase();
    if (!ALLOWED_CATEGORIES.contains(cat)) throw new IllegalArgumentException("Invalid category");
    if (file.isEmpty()) throw new IllegalArgumentException("Empty file");
    if (file.getSize() > MAX_BYTES) throw new IllegalArgumentException("File exceeds 25MB limit");
    return storage.store(cat, file.getOriginalFilename(), file.getContentType(), file.getBytes(), relatedType, relatedId);
  }

  @GetMapping
  @PreAuthorize("isAuthenticated()")
  public List<StoredFile> list(@RequestParam(required = false) String category) {
    var schoolId = lookup.schoolId();
    return category == null
        ? List.copyOf(storage.byId(UUID.randomUUID()) == null ? List.of() : List.of()) // placeholder, see below
        : List.of();
  }

  // Cleaner list endpoint
  @GetMapping("/list")
  @PreAuthorize("isAuthenticated()")
  public List<StoredFile> listAll(@RequestParam(required = false) String category) {
    return category == null
        ? storage_listAll()
        : storage_listByCategory(category.toUpperCase());
  }

  private List<StoredFile> storage_listAll() { return repoFiles().findBySchoolIdOrderByCreatedAtDesc(lookup.schoolId()); }
  private List<StoredFile> storage_listByCategory(String c) { return repoFiles().findBySchoolIdAndCategoryOrderByCreatedAtDesc(lookup.schoolId(), c); }

  // Use field injection lite: get repository through application context-free trick — better, inject directly:
  private final com.temariflow.repository.StoredFileRepository repoFiles = null;
  private com.temariflow.repository.StoredFileRepository repoFiles() {
    return org.springframework.web.context.support.WebApplicationContextUtils
        .getRequiredWebApplicationContext(((jakarta.servlet.ServletRequest) org.springframework.web.context.request.RequestContextHolder
            .currentRequestAttributes().resolveReference("request")).getServletContext())
        .getBean(com.temariflow.repository.StoredFileRepository.class);
  }

  @PostMapping("/{id}/report-card")
  @PreAuthorize("hasAnyRole('TEACHER','PRINCIPAL','SCHOOL_OWNER')")
  public Map<String, String> generateReportCard(@PathVariable UUID id, @RequestParam(required = false) String signature) {
    var stored = reportCards.generate(id, signature);
    return Map.of("downloadToken", stored.getDownloadToken(), "filename", stored.getFilename());
  }

  @GetMapping("/download/{token}")
  public ResponseEntity<byte[]> download(@PathVariable String token) {
    var f = storage.byToken(token);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getFilename() + "\"")
        .header(HttpHeaders.CONTENT_TYPE, f.getContentType())
        .body(storage.read(f));
  }

  @GetMapping("/verify/{resultId}")
  public Map<String, Object> verify(@PathVariable UUID resultId) {
    var rs = summaries.findById(resultId).orElse(null);
    if (rs == null) return Map.of("valid", false);
    return Map.of(
        "valid", true,
        "school", rs.getSchool().getName(),
        "studentNumber", rs.getStudent().getStudentNumber(),
        "exam", rs.getExam().getName(),
        "average", rs.getAverage(),
        "rank", rs.getRankInClass(),
        "decision", rs.getDecision()
    );
  }
}
