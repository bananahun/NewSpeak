package com.ssafy.newspeak.article.repository;

import com.ssafy.newspeak.article.dto.ArticleFindByCategoryMain;
import com.ssafy.newspeak.article.dto.ArticlesFindByCategoryMain;
import com.ssafy.newspeak.article.dto.ArticleFindResponse;
import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.dto.CategoryFindResponse;
import com.ssafy.newspeak.category.entity.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ArticleRepository {

    private final EntityManager em;

    public List<Article> findAll() {
        return em.createQuery("select a from Article a", Article.class)
                .getResultList();
    }

    public List<ArticlesFindByCategoryMain> findTop5ArticlesByCategory() {
        List<Category> categories = em.createQuery("SELECT c FROM Category c", Category.class).getResultList();

        return categories.stream()
                .map(category -> {
                    TypedQuery<Article> query = em.createQuery(
                            "SELECT a FROM Article a WHERE a.category = :category ORDER BY a.publishedDate DESC",
                            Article.class);
                    query.setParameter("category", category);
                    query.setMaxResults(5);

                    List<ArticleFindByCategoryMain> top5Articles = query.getResultList().stream()
                            .map(ArticleFindByCategoryMain::from)
                            .collect(Collectors.toList());

                    return new ArticlesFindByCategoryMain(category, top5Articles);
                })
                .collect(Collectors.toList());
    }

    public List<Article> findByLevel(Integer level) {
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

    public List<Article> findByCategory(long id, int page, int size) {
        if (id <= 0 || page < 0 || size <= 0) {
            return Collections.emptyList();
        }

        Category category = em.find(Category.class, id);
        if (category == null) {
            return Collections.emptyList();
        }

        TypedQuery<Article> query = em.createQuery("select a from Article a where a.category = :category", Article.class);
        query.setParameter("category", category);

        // 페이지네이션 설정
        query.setFirstResult(page * size); // 시작 인덱스 설정
        query.setMaxResults(size); // 가져올 최대 결과 수 설정

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
