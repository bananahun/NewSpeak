package com.ssafy.newspeak.article.repository;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.entity.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ArticleRepository {

    private final EntityManager em;

    public List<Article> findAll() {
        return em.createQuery("select a from Article a", Article.class)
                .getResultList();
    }

    public List<Article> findByLevel(String level) {
        TypedQuery<Article> query = em.createQuery("select a from Article a where a.level = :level", Article.class);
        query.setParameter("level", level);

        return query.getResultList();
    }

    public List<Article> findByTitle(String title) {
        if (title == null || title.isEmpty()) {
            return Collections.emptyList();
        }

        TypedQuery<Article> query = em.createQuery(
                "select a from Article a where lower(a.title) like lower(concat('%', :title, '%'))",
                Article.class
        );

        query.setParameter("title", title);

        return query.getResultList();
    }

    public List<Article> findByCategory(long id) {
        if (id <= 0) {
            return Collections.emptyList();
        }

        Category category = em.find(Category.class, id);
        TypedQuery<Article> query = em.createQuery("select a from Article a where a.category = :category", Article.class);

        query.setParameter("category", category);

        return query.getResultList();
    }

    public Optional<Article> findById(long id) {
        return Optional.ofNullable(em.find(Article.class, id));
    }

    public void save(Article article) { em.persist(article); }

    public void delete(Article article) { em.remove(article); }

    public void deleteAll() {
        em.createQuery("delete from Article").executeUpdate();
    }
}
