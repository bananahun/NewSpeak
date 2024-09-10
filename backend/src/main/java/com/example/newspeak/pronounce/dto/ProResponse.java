package com.example.newspeak.pronounce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProResponse {

    private Long id;
    private Integer proScore;
    private Long sentenceId;

    public static ProResponse from(Long id, Integer proScore, Long sentenceId) {
        ProResponse sentenceProResponse = new ProResponse();
        sentenceProResponse.id = id;
        sentenceProResponse.proScore = proScore;
        sentenceProResponse.sentenceId = sentenceId;
        return sentenceProResponse;
    }
}
