package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.voca.entity.Voca;

import java.util.List;

public class VocaDto {
    String title;

    public VocaDto(Voca voca){
        this.title = voca.getTitle();
    }
}
