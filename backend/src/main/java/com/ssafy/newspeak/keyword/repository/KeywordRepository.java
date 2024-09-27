package com.ssafy.newspeak.keyword.repository;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.keyword.entity.Keyword;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class KeywordRepository {

    private final EntityManager em;

    public List<Keyword> findAll() {
        return em.createQuery("select k from Keyword k order by cnt desc", Keyword.class)
                .setMaxResults(100)
                .getResultList();
    }

    public Optional<Keyword> findById(Long id) {
        return Optional.ofNullable(em.find(Keyword.class, id));
    }

    public void save(Keyword keyword) { em.persist(keyword); }

    public void delete(Keyword keyword) { em.remove(em.merge(keyword)); }

    public void deleteAll() {em.createQuery("delete from Keyword").executeUpdate(); }
}
