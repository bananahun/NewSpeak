package com.ssafy.newspeak.explog.repo;

import com.ssafy.newspeak.explog.entity.ExpLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpLogRepo extends JpaRepository<ExpLog,Long> {

    @Query("SELECT new com.ssafy.newspeak.explog.repo.ExpLogDto(e.id, e.expChange) " +
            "FROM ExpLog e JOIN e.user u WHERE e.user.id = :userId")
    List<ExpLogDto> findAllExpLogByUserId(Long userId);

    @Query("SELECT new com.ssafy.newspeak.explog.repo.DateChangeDto(e.createdDate, SUM(e.expChange)) " +
            "FROM ExpLog e " +
            "WHERE e.user.id = :userId AND DATE(e.createdDate) = :date " +
            "GROUP BY DATE(e.createdDate)")
    List<DateChangeDto> findChangeByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT new com.ssafy.newspeak.explog.repo.DailyExpDto(e.createdDate, SUM(e.expChange)) " +
            "FROM ExpLog e " +
            "WHERE e.user.id = :userId AND e.createdDate BETWEEN :startDate AND :endDate " +
            "GROUP BY e.createdDate")
    List<DailyExpDto> findDailyExpByUserIdAndMonth(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
