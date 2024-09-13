package com.ssafy.newspeak.expLog.entity;

import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name="exp_log")
public class ExpLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exp_log_id")
    private Long id;

    private Integer change;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
}
