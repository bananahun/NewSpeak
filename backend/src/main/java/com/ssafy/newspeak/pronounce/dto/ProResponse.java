package com.ssafy.newspeak.pronounce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProResponse {

    private Double proScore;

    public static ProResponse from(Double proScore) {
        ProResponse sentenceProResponse = new ProResponse();
        sentenceProResponse.proScore = proScore;
        return sentenceProResponse;
    }
}
