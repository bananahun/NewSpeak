package com.ssafy.newspeak.article.controller;

import lombok.Getter;

@Getter
public class AddWordRequest {
    Long vocaId;
    String wordContent;
    Long sentenceId;
}
