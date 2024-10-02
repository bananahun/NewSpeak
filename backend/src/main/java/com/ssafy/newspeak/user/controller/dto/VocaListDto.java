package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.Voca;
import lombok.Getter;

import java.util.List;

@Getter
public class VocaListDto {
    private List<VocaInfoDto> vocas;
    private int count;
    public VocaListDto(List<VocaInfoDto> vocas, int count) {
        this.vocas = vocas;
        this.count = count;
    }
}
