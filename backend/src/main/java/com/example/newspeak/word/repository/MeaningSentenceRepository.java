package com.example.newspeak.word.repository;

import com.example.newspeak.word.entity.MeaningSentence;
import com.example.newspeak.word.entity.WordMeaning;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MeaningSentenceRepository {

    private final EntityManager em;

    // ID로 MeaningSentence 찾기
    public MeaningSentence findById(Long id) {
        return em.find(MeaningSentence.class, id);
    }

    // WordMeaning ID로 MeaningSentence 찾기
    public MeaningSentence findByWordMeaningId(Long id) {
        WordMeaning wordMeaning = em.find(WordMeaning.class, id);
        TypedQuery<MeaningSentence> query = em.createQuery(
                "SELECT ms FROM MeaningSentence ms WHERE ms.wordMeaning = :wordMeaning", MeaningSentence.class);
        query.setParameter("wordMeaning", wordMeaning);
        return query.getSingleResult();
    }

    // MeaningSentence 저장
    public void save(MeaningSentence meaningSentence) {
        em.persist(meaningSentence);
    }
}
