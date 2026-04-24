package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.time.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="timetable_entries")
public class TimetableEntry extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Section section; @ManyToOne(fetch=FetchType.LAZY) private TeacherProfile teacher; @ManyToOne(optional=false, fetch=FetchType.LAZY) private Subject subject; private DayOfWeek dayOfWeek; private LocalTime startTime; private LocalTime endTime; }
