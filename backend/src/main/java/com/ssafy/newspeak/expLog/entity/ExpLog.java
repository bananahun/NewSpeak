package com.ssafy.newspeak.expLog.entity;

import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name="exp_log")
public class ExpLog{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exp_log_id")
    private Long id;

    private Integer change;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @CreatedDate
    private LocalDate createdDate; // 생성 날짜

}
