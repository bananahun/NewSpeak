package com.ssafy.newspeak.article.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AddWordRequest {
    @Setter
    Long vocaId;
    String wordContent;
    Long sentenceId;
}
