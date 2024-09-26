package com.ssafy.newspeak.voca.repository;

import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import com.ssafy.newspeak.voca.entity.VocaWord;
import com.ssafy.newspeak.voca.entity.VocaWordId;
import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VocaWordRepo extends JpaRepository<VocaWord, VocaWordId> {
//    @Query("select new com.ssafy.newspeak.voca.repository.dto.WordDetail(w.content,w.wordMeanings) "+
//            "FROM Voca v "+
//            "JOIN VocaWord vw ON v.id = vw.vocaWordId.vocaId "+
//            "JOIN Word w ON vw.vocaWordId.wordId = w.id "+
//            "WHERE v.id =:vocaId")
    @Query("SELECT w " +
            "FROM Voca v " +
            "JOIN VocaWord vw ON v.id = vw.vocaWordId.vocaId " +
            "JOIN Word w ON vw.vocaWordId.wordId = w.id " +
            "JOIN FETCH w.wordMeanings wm " +   // Fetch the wordMeanings
            "WHERE v.id = :vocaId")
    List<WordDetail> findVocaWordsByVocaId(Long vocaId);

}
