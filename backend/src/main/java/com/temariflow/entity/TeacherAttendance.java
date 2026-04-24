package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="teacher_attendance")
public class TeacherAttendance extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private TeacherProfile teacher; private LocalDate attendanceDate; @Enumerated(EnumType.STRING) private AttendanceStatus status; private String note; }
