package com.ssafy.newspeak.voca;

import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.Voca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VocaRepo extends JpaRepository<Voca, Long> {

    @Query("SELECT new com.ssafy.newspeak.user.repository.dto.VocaInfoDto(v.id,v.title,v.quizSuccessCount) " +
            "FROM Voca v WHERE v.user.id = :userId")
    List<VocaInfoDto> findVocaByUserId(@Param("userId") Long userId);
}
