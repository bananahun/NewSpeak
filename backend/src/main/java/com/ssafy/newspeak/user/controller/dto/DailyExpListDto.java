package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.expLog.repo.dto.DailyExpDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class DailyExpListDto {
    List<DailyExpDto> dailyExpList;
}
