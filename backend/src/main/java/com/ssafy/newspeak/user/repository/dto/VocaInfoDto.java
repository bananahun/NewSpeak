package com.ssafy.newspeak.user.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class VocaInfoDto {
    Long vocaId;
    private String title;
    private int quizSuccessCount;
}
