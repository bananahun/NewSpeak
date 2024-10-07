package com.ssafy.newspeak.voca.repository;

import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import com.ssafy.newspeak.voca.entity.VocaWord;
import com.ssafy.newspeak.voca.entity.VocaWordId;
import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import com.ssafy.newspeak.word.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VocaWordRepo extends JpaRepository<VocaWord, VocaWordId> {
    @Query("SELECT w " +
        "FROM Voca v " +
        "JOIN VocaWord vw ON v.id = vw.vocaWordId.vocaId " +
        "JOIN Word w ON vw.vocaWordId.wordId = w.id " +
//        "JOIN FETCH w.wordMeanings wm " + //fetch join  대신 batch size로 word에 wordMeanings 조회
        "WHERE v.id = :vocaId")
    List<Word> findVocaWordsByVocaId(Long vocaId);

}
