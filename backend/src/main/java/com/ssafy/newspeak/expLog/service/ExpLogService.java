package com.ssafy.newspeak.expLog.service;

import com.ssafy.newspeak.expLog.entity.ExpLog;
import com.ssafy.newspeak.expLog.repo.ExpLogRepo;
import com.ssafy.newspeak.expLog.repo.dto.DailyExpDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpLogService {
    private final ExpLogRepo expLogRepo;

    public void saveExpLog(ExpLog expLog) {

    }

    public List<DailyExpDto> getDailyExpsByMonth(Long userId, YearMonth yearMonth) {
        LocalDate startDate = yearMonth.atDay(1); // 해당 월의 첫 날
        LocalDate endDate = yearMonth.atEndOfMonth(); // 해당 월의 마지막 날

        List<DailyExpDto> dailyExps = expLogRepo.findDailyExpByUserIdAndMonth(userId, startDate, endDate);

        // 만약 모든 날짜에 대해 경험치가 없는 경우도 포함하고 싶다면
        List<DailyExpDto> result = new ArrayList<>();
        for (LocalDate date = startDate; date.isBefore(endDate.plusDays(1)); date = date.plusDays(1)) {
            LocalDate finalDate = date;
            Long totalExp = dailyExps.stream()
                    .filter(d -> d.getDate().isEqual(finalDate))
                    .map(DailyExpDto::getTotalExp)
                    .findFirst()
                    .orElse(0L);

            result.add(new DailyExpDto(date, totalExp));
        }

        return result;
    }
}
