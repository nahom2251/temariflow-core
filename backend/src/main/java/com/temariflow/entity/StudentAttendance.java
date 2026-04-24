package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="student_attendance")
public class StudentAttendance extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private StudentProfile student; private LocalDate attendanceDate; @Enumerated(EnumType.STRING) private AttendanceStatus status; private String note; }
