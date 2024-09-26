package com.ssafy.newspeak.explog.repo.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class DateChangeDto {
    private LocalDate date;
    private Long totalChange;

    public DateChangeDto(LocalDate date, Long totalChange) {
        this.date = date;
        this.totalChange = totalChange;
    }
}