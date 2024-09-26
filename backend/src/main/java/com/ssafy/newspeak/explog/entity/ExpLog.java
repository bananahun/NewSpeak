package com.ssafy.newspeak.explog.entity;

import com.ssafy.newspeak.activitytype.entity.ActivityType;
import com.ssafy.newspeak.explog.service.ExpLogRequest;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "act_type_id")
    private ActivityType activityType;

    @CreatedDate
    private LocalDate createdDate; // 생성 날짜

    public ExpLog(ExpLogRequest expLogRequest){
        this.change = expLogRequest.getChange();
        this.user = expLogRequest.getUser();
        this.activityType = expLogRequest.getActivityType();
    }
}
