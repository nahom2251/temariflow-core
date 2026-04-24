package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="student_profiles")
public class StudentProfile extends BaseEntity {
  @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school;
  @OneToOne(optional=false, fetch=FetchType.LAZY) private User user;
  @Column(nullable=false) private String studentNumber;
  @Enumerated(EnumType.STRING) private Gender gender;
  private LocalDate dateOfBirth;
  private String guardianName; private String guardianPhone; private String guardianEmail; private String address;
  @Column(length=2000) private String documentsUrl;
  @Column(length=4000) private String academicHistory;
  @ManyToOne(fetch=FetchType.LAZY) private GradeLevel grade;
  @ManyToOne(fetch=FetchType.LAZY) private Section section;
}
