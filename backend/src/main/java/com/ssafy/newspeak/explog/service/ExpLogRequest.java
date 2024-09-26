package com.ssafy.newspeak.explog.service;

import com.ssafy.newspeak.activitytype.entity.ActivityType;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ExpLogRequest {
    /**
     * 활동에 대한 평가
     * ExpLog.change = ActivityType.actExp * this.rate
     */
    private Double rate;

    private Long userId;

    private Long actTypeId;
}
