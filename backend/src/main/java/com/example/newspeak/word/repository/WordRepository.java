package com.example.newspeak.word.repository;

import com.example.newspeak.word.entity.Word;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class WordRepository {

    @PersistenceContext
    private final EntityManager em;

    public List<Word> findAll() {
        return em.createQuery("SELECT w FROM Word w", Word.class).getResultList();
    }

    public Word findById(Long id) { return em.find(Word.class, id); }

    public Word findByContent(String content) {
        try {
            TypedQuery<Word> query = em.createQuery("SELECT w FROM Word w WHERE w.content = :content", Word.class);
            query.setParameter("content", content);
            return query.getSingleResult();
        } catch (NoResultException e) {
            // 결과가 없는 경우
            return null;
        } catch (NonUniqueResultException e) {
            // 결과가 여러 개인 경우
            throw new RuntimeException("Multiple results found for content: " + content);
        }
    }

    public void save(Word word) { em.persist(word); }

    public void delete(Word word) { em.remove(word); }

    public void deleteAll() { em.createQuery("DELETE FROM Word").executeUpdate(); }
}
