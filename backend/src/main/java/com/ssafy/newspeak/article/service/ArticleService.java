package com.ssafy.newspeak.article.service;

import com.ssafy.newspeak.article.dto.ArticlesFindByCategoryMain;
import com.ssafy.newspeak.article.dto.ArticleFindResponse;
import com.ssafy.newspeak.article.dto.ArticlesFindResponse;
import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.article.repository.ArticleRepository;
import com.ssafy.newspeak.category.entity.Category;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticlesFindResponse> findAll() {
        List<Article> articles = articleRepository.findAll();
        List<ArticlesFindResponse> articlesFindResponses = new ArrayList<>();
        for (Article article : articles) {
            ArticlesFindResponse articlesFindResponse = ArticlesFindResponse.from(article);  // Article -> ArticlesFindResponse 변환
            articlesFindResponses.add(articlesFindResponse);  // 변환된 DTO 리스트에 추가
        }
        return articlesFindResponses;
    }

    public List<ArticlesFindByCategoryMain> findByCategoryMains() {
        return articleRepository.findTop5ArticlesByCategory();
    }

    public List<ArticlesFindResponse> findByLevel(Integer level) {
        List<Article> articles = articleRepository.findByLevel(level);
        List<ArticlesFindResponse> articlesFindResponses = new ArrayList<>();
        for (Article article : articles) {
            ArticlesFindResponse articlesFindResponse = ArticlesFindResponse.from(article);
            articlesFindResponses.add(articlesFindResponse);
        }
        return articlesFindResponses;
    }

    public List<ArticlesFindResponse> findByTitle(String title) {
        List<Article> articles = articleRepository.findByTitle(title);
        List<ArticlesFindResponse> articlesFindResponses = new ArrayList<>();
        for (Article article : articles) {
            ArticlesFindResponse articlesFindResponse = ArticlesFindResponse.from(article);
            articlesFindResponses.add(articlesFindResponse);
        }
        return articlesFindResponses;
    }

    public List<ArticlesFindResponse> findByCategory(long id, int page) {
        List<Article> articles = articleRepository.findByCategory(id, page, 5);
        List<ArticlesFindResponse> articlesFindResponses = new ArrayList<>();
        for (Article article : articles) {
            ArticlesFindResponse articlesFindResponse = ArticlesFindResponse.from(article);
            articlesFindResponses.add(articlesFindResponse);
        }
        return articlesFindResponses;
    }

    public ArticleFindResponse findById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        ArticleFindResponse articleFindResponse = ArticleFindResponse.from(article);
        return articleFindResponse;
    }

    public long save(Article article) {
        articleRepository.save(article);
        return article.getId();
    }

    public long delete(Long id) {
        articleRepository.findById(id)
                .ifPresent(articleRepository::delete);

        return id;
    }

    public void deleteAll() {
        articleRepository.deleteAll();
    }
}