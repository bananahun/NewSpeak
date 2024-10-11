package com.ssafy.newspeak.pronounce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProResponse {

    private Double proScore;  // 발음 평가 점수
    private int statusCode;   // 상태 코드 (200, 400, 429 등)
    private String message;   // 에러 메시지 또는 상태 메시지

    // 발음 평가 점수만 포함하는 응답 생성 (정상 응답)
    public static ProResponse from(Double proScore) {
        return new ProResponse(proScore, 200, "Success");
    }

    // 에러 상태 응답을 위한 정적 팩토리 메서드
    public static ProResponse errorResponse(int statusCode, String message) {
        return new ProResponse(null, statusCode, message);
    }
}
