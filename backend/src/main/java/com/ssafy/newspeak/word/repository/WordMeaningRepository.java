package com.ssafy.newspeak.word.repository;

import com.ssafy.newspeak.word.entity.Word;
import com.ssafy.newspeak.word.entity.WordMeaning;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class WordMeaningRepository {

    private final EntityManager em;

    public List<WordMeaning> findByWordId(Long id) {
        Word word = em.find(Word.class, id);
        return em.createQuery("SELECT wm FROM WordMeaning wm WHERE wm.word = :word", WordMeaning.class)
                .setParameter("word", word)
                .getResultList();
    }

    public void save(WordMeaning wordMeaning) { em.persist(wordMeaning); }

    public void delete(WordMeaning wordMeaning) { em.remove(wordMeaning); }
}
