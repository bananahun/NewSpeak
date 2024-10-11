package com.ssafy.newspeak.voca.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
public class DeleteWordRequest {
    @Setter
    private Long vocaId;
    private Long wordId;
}
