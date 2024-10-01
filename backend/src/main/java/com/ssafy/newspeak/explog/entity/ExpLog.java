package com.ssafy.newspeak.explog.entity;

import com.ssafy.newspeak.activitytype.entity.ActivityType;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Table(name="exp_log")
public class ExpLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exp_log_id")
    private Long id;

    private Integer expChange;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "act_type_id")
    private ActivityType activityType;

    private Long actId;

    @CreatedDate
    private LocalDate createdDate; // 생성 날짜

    public ExpLog(Integer expChange, ActivityType activityType, User user,Long actId){
        this.activityType=activityType;
        this.expChange = expChange;
        this.user=user;
        this.actId=actId;
    }
}
