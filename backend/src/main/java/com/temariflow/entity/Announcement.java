package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="announcements")
public class Announcement extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(fetch=FetchType.LAZY) private User author; @Column(nullable=false) private String title; @Column(length=4000) private String body; private String audienceRole; }
