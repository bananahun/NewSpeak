package com.example.newspeak.pronounce.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;

@Getter
@Builder
@Entity
@Table(name = "pronounce")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Pronounce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pro_id")
    private Long id;

    @Column
    private String script;

    @Column
    private Integer proScore;

    @Column(name = "audio_path")
    private String audioPath;

    @Column
    @CreationTimestamp
    private Timestamp createdAt;
}
