package com.example.newspeak.article.controller;

import com.example.newspeak.article.dto.ArticleFindResponse;
import com.example.newspeak.article.dto.ArticlesFindResponse;
import com.example.newspeak.article.entity.Article;
import com.example.newspeak.article.service.ArticleService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<Result> findAll() {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findAll();
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/{level}")
    public ResponseEntity<Result> findByLevel(@PathVariable("level") String level) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByLevel(level);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/{title}")
    public ResponseEntity<Result> findByTitle(@PathVariable("title") String title) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByTitle(title);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/{category_id}")
    public ResponseEntity<Result> findByCategory(@PathVariable("category_id") Long category_id) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByCategory(category_id);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleFindResponse> findById(@PathVariable("id") Long id) {
        ArticleFindResponse result = articleService.findById(id);
        return ResponseEntity.status(OK).body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        articleService.delete(id);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @Getter
    @AllArgsConstructor
    static class Result<T> {

        private int count;
        private T data;
    }
}
