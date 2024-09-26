package com.ssafy.newspeak.expLog.repo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class DateChangeDto {
    private LocalDate date;
    private Long totalChange;

    public DateChangeDto(LocalDate date, Long totalChange) {
        this.date = date;
        this.totalChange = totalChange;
    }
}