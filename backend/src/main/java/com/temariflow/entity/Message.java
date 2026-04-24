package com.temariflow.entity;

import jakarta.persistence.*; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @Entity @Table(name="messages")
public class Message extends BaseEntity { @ManyToOne(optional=false, fetch=FetchType.LAZY) private School school; @ManyToOne(optional=false, fetch=FetchType.LAZY) private User sender; @ManyToOne(optional=false, fetch=FetchType.LAZY) private User recipient; @Column(length=4000) private String body; @Enumerated(EnumType.STRING) private MessageStatus status; }
