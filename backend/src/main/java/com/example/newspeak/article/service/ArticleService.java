package com.example.newspeak.article.service;

import com.example.newspeak.article.dto.ArticleFindResponse;
import com.example.newspeak.article.dto.ArticlesFindResponse;
import com.example.newspeak.article.entity.Article;
import com.example.newspeak.article.repository.ArticleRepository;
import com.example.newspeak.category.entity.Category;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<ArticlesFindResponse> findByLevel(String level) {
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

    public List<ArticlesFindResponse> findByCategory(long id) {
        List<Article> articles = articleRepository.findByCategory(id);
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


    public long delete(Long id) {
        articleRepository.findById(id)
                .ifPresent(articleRepository::delete);

        return id;
    }

    public void deleteAll() {
        articleRepository.deleteAll();
    }

    public long save(Article article) {
        articleRepository.save(article);
        return article.getId();
    }
}