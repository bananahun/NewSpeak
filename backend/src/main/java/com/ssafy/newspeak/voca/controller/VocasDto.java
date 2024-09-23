package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.Voca;
import lombok.Getter;

import java.util.List;

@Getter
public class VocasDto {
    List<VocaInfoDto> vocas;
    int count;
    public VocasDto(List<VocaInfoDto> vocas) {
        this.vocas = vocas;
        this.count=vocas.size();
    }
}
