package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="result_summaries")
public class ResultSummary extends BaseEntity {
  @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school;
  @ManyToOne(optional=false, fetch=FetchType.LAZY) private Exam exam;
  @ManyToOne(optional=false, fetch=FetchType.LAZY) private StudentProfile student;
  private BigDecimal average;
  private int rankInClass;
  private String decision;
  @Column(length = 2000) private String teacherComment;
  private String signature;
  private String reportCardToken;
}
