package com.ssafy.newspeak.article.repository;

import com.ssafy.newspeak.article.dto.ArticleFindByCategoryMain;
import com.ssafy.newspeak.article.dto.ArticlesFindByCategoryMain;
import com.ssafy.newspeak.article.dto.ArticleFindResponse;
import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.dto.CategoryFindResponse;
import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.keyword.entity.Keyword;
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

    // 특정 Keyword ID로 해당 키워드와 연관된 Article을 조회
    public List<Article> findArticlesByKeywordId(Long keywordId, int page, int size) {
        // 1단계: ArticleKeyword 테이블에서 해당 keywordId로 articleId 리스트를 조회
        TypedQuery<Long> articleIdQuery = em.createQuery(
                "SELECT ak.article.id FROM ArticleKeword ak WHERE ak.keyword.id = :keywordId",
                Long.class
        );
        articleIdQuery.setParameter("keywordId", keywordId);

        List<Long> articleIds = articleIdQuery.getResultList();

        // 2단계: 조회된 articleId 리스트로 Article 테이블에서 Article 조회
        if (articleIds.isEmpty()) {
            return List.of(); // 검색된 articleId가 없으면 빈 리스트 반환
        }

        TypedQuery<Article> articleQuery = em.createQuery(
                "SELECT a FROM Article a WHERE a.id IN :articleIds",
                Article.class
        );
        articleQuery.setParameter("articleIds", articleIds);

        articleQuery.setFirstResult(page * size);
        articleQuery.setMaxResults(size);

        // 결과 리스트 반환
        return articleQuery.getResultList();
    }

    public List<Article> findByLevel(Integer level, int page, int size) {
        TypedQuery<Article> query = em.createQuery("select a from Article a where a.level = :level", Article.class);
        query.setParameter("level", level);

        query.setFirstResult(page * size);
        query.setMaxResults(size);
        return query.getResultList();
    }

    public List<Article> findByTitle(String title, int page, int size) {
        if (title == null || title.isEmpty()) {
            return Collections.emptyList();
        }

        TypedQuery<Article> query = em.createQuery(
                "select a from Article a where lower(a.title) like lower(concat('%', :title, '%'))",
                Article.class
        );

        query.setParameter("title", title);

        query.setFirstResult(page * size);
        query.setMaxResults(size);

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
