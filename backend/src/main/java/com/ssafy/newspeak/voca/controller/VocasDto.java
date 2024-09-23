package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.voca.entity.Voca;

import java.util.List;

public class VocasDto {
    List<Voca> vocas;
    int count;
    public VocasDto(List<Voca> vocas) {
        this.vocas = vocas;
        this.count=vocas.size();
    }
}
