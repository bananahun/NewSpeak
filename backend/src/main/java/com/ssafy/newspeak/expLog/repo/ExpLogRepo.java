package com.ssafy.newspeak.expLog.repo;

import com.ssafy.newspeak.expLog.entity.ExpLog;
import com.ssafy.newspeak.expLog.repo.dto.DailyExpDto;
import com.ssafy.newspeak.expLog.repo.dto.DateChangeDto;
import com.ssafy.newspeak.expLog.repo.dto.ExpLogDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpLogRepo extends JpaRepository<ExpLog,Long> {

    @Query("SELECT new com.ssafy.newspeak.expLog.repo.dto.ExpLogDto(e.id, e.change) " +
            "FROM ExpLog e JOIN e.user u WHERE e.user.id = :userId")
    List<ExpLogDto> findAllExpLogByUserId(Long userId);

    @Query("SELECT new com.ssafy.newspeak.expLog.repo.dto.DateChangeDto(e.createdDate, SUM(e.change)) " +
            "FROM ExpLog e " +
            "WHERE e.user.id = :userId AND DATE(e.createdDate) = :date " +
            "GROUP BY DATE(e.createdDate)")
    List<DateChangeDto> findChangeByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT new com.ssafy.newspeak.expLog.repo.dto.DailyExpDto(e.createdDate, SUM(e.change)) " +
            "FROM ExpLog e " +
            "WHERE e.user.id = :userId AND e.createdDate BETWEEN :startDate AND :endDate " +
            "GROUP BY e.createdDate")
    List<DailyExpDto> findDailyExpByUserIdAndMonth(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
