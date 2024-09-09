package com.example.newspeak.sentence.repository;

import com.example.newspeak.sentence.entity.Sentence;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SentenceRepository {

    private final EntityManager em;

    public Optional<Sentence> findById(Long id) {
        return Optional.ofNullable(em.find(Sentence.class, id));
    }

    public void save(Sentence sentence) { em.persist(sentence); }

    public void delete(Sentence sentence) { em.remove(sentence); }

    public void deleteAll() {
        em.createQuery("delete from Sentence").executeUpdate();
    }
}
