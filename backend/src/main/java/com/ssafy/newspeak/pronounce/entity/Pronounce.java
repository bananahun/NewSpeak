package com.ssafy.newspeak.pronounce.entity;

import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

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
    private Double proScore;

    @Column(name = "audio_path", length = 2000)
    private String audioPath;

    @Column
    @CreationTimestamp
    private Timestamp createdAt;
}
