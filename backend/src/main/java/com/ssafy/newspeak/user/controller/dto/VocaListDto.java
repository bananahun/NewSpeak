package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.voca.entity.Voca;

import java.util.List;

public class VocaListDto {
    private List<Voca> vocas;
    private int count;
    public VocaListDto(List<Voca> vocas, int count) {
        this.vocas = vocas;
        this.count = count;
    }
}
