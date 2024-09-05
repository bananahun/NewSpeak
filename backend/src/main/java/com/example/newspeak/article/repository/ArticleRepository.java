package com.example.newspeak.article.repository;

import com.example.newspeak.article.entity.Article;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ArticleRepository {

    private final EntityManager em;

    public void save(Article article) { em.persist(article); }

    public Optional<Article> findById(long id) {
        return Optional.ofNullable(em.find(Article.class, id));
    }

    public List<Article> findAll() {
        return em.createQuery("select a from Article a", Article.class)
            .getResultList();
    }

    public void delete(Article article) { em.remove(article); }
}
