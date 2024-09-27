package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.explog.repo.DailyExpDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class DailyExpListDto {
    List<DailyExpDto> dailyExpList;
}
