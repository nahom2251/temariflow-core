package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="teacher_profiles")
public class TeacherProfile extends BaseEntity {
  @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school;
  @OneToOne(optional=false, fetch=FetchType.LAZY) private User user;
  @Column(nullable=false) private String employeeNumber;
  private String subjectSpecialty;
  private String phone; private String address;
  private BigDecimal salary;
}
