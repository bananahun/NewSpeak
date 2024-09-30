package com.ssafy.newspeak.explog.service;

import com.ssafy.newspeak.activitytype.entity.ActivityType;
import com.ssafy.newspeak.activitytype.entity.ActivityTypeEnum;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ExpLogRequest {
    /**
     * 활동에 대한 평가
     * ExpLog.change = ActivityType.actExp * this.rate
     */
    private Double rate;

    private Long userId;

    private Long actTypeId;

    private Long actId;

    public static ExpLogRequest from(ActivityTypeEnum actTypeEnum, Long userId, Double rate) {
        return ExpLogRequest.builder()
            .userId(userId)
            .rate(rate)
            .actTypeId(actTypeEnum.getId()) // enum을 ID로 변환
            .build();
    }

}
