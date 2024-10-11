package com.ssafy.newspeak.pronounce.repository;

import com.ssafy.newspeak.pronounce.entity.Pronounce;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ProRepository {

    private final EntityManager em;

    public Pronounce findById(Long id) { return em.find(Pronounce.class, id); }

//    public List<Pronounce> findBySentenceId(Long sentenceId) {
//        return em.createQuery("SELECT p FROM pronounce p WHERE sp.sentence = :sentenceId", Pronounce.class)
//                .setParameter("sentenceId", sentenceId)
//                .getResultList();
//    }

    public void save(Pronounce pronounce) { em.persist(pronounce); }

    public void delete(Pronounce pronounce) { em.remove(pronounce); }

    public void deleteAll() { em.createQuery("DELETE FROM Pronounce").executeUpdate(); }
}
