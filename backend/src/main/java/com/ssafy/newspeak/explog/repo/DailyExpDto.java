package com.ssafy.newspeak.explog.repo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class DailyExpDto {
    private LocalDate date;
    private Long totalExp;

}
