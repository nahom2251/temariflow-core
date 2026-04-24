package com.temariflow.dto;

import com.temariflow.entity.*; import jakarta.validation.constraints.*; import java.math.BigDecimal; import java.time.*; import java.util.*;

public class ErpDtos {
  public record CreateStudentRequest(@NotBlank String fullName, @Email @NotBlank String email, @NotBlank String studentNumber, Gender gender, UUID gradeId, UUID sectionId, String guardianName, String guardianPhone, String guardianEmail) {}
  public record CreateTeacherRequest(@NotBlank String fullName, @Email @NotBlank String email, @NotBlank String employeeNumber, String subjectSpecialty, BigDecimal salary) {}
  public record AcademicRequest(@NotBlank String name, String code, UUID gradeId, UUID subjectId, UUID sectionId, UUID teacherId, Integer capacity) {}
  public record DistributionRequest(@NotNull UUID gradeId, @NotEmpty List<UUID> sectionIds, boolean rerun) {}
  public record ManualMoveRequest(@NotNull UUID studentId, @NotNull UUID sectionId) {}
  public record AttendanceRequest(@NotNull UUID personId, @NotNull LocalDate date, @NotNull AttendanceStatus status, String note) {}
  public record ExamRequest(@NotBlank String name, UUID gradeId, LocalDate startsAt, LocalDate endsAt) {}
  public record MarkRequest(@NotNull UUID examId, @NotNull UUID studentId, @NotNull UUID subjectId, @NotNull BigDecimal mark, @NotNull BigDecimal maxMark) {}
  public record InvoiceRequest(@NotNull UUID studentId, @NotBlank String invoiceNumber, @NotNull BigDecimal amount, LocalDate dueDate) {}
  public record ExpenseRequest(@NotBlank String category, @NotNull BigDecimal amount, LocalDate expenseDate, String note) {}
  public record PayrollRequest(@NotNull UUID teacherId, @NotNull YearMonth payrollMonth, @NotNull BigDecimal grossSalary, BigDecimal deductions) {}
  public record BookRequest(@NotBlank String title, String author, String isbn, String category, int totalCopies) {}
  public record BorrowRequest(@NotNull UUID bookId, @NotNull UUID studentId, @NotNull LocalDate dueAt) {}
  public record AnnouncementRequest(@NotBlank String title, @NotBlank String body, String audienceRole) {}
  public record MessageRequest(@NotNull UUID recipientId, @NotBlank String body) {}
}
