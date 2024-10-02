package com.ssafy.newspeak.elastic.controller;

import com.ssafy.newspeak.elastic.document.ArticleDocument;
import com.ssafy.newspeak.elastic.dto.ElasticArticlesResponse;
import com.ssafy.newspeak.elastic.service.ArticleSearchService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/elastic/articles")
public class ArticleSearchController {

    private final ArticleSearchService articleSearchService;

    @GetMapping
    public ResponseEntity<Result> searchByTitle(
            @RequestParam("keyword") String keyword
            ,@RequestParam("page") int page) {
        List<ElasticArticlesResponse> articles = articleSearchService.searchByTitle(keyword, page);
        int count = articles.size();
        Result<List<ElasticArticlesResponse>> result = new Result<>(count, articles);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/content")
    public ResponseEntity<Result> searchByContent(
            @RequestParam("keyword") String keyword,
            @RequestParam("page") int page
    ) {
        List<ElasticArticlesResponse> articles = articleSearchService.searchByContent(keyword, page);
        int count = articles.size();
        Result<List<ElasticArticlesResponse>> result = new Result<>(count, articles);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/content/kr")
    public ResponseEntity<Result> searchByTranslatedContent(
            @RequestParam("keyword") String keyword,
            @RequestParam("page") int page
    ) {
        List<ElasticArticlesResponse> articles = articleSearchService.searchByTranslatedContent(keyword, page);
        int count = articles.size();
        Result<List<ElasticArticlesResponse>> result = new Result<>(count, articles);
        return ResponseEntity.status(OK).body(result);
    }


    @Getter
    @AllArgsConstructor
    static class Result<T> {

        private int count;
        private T data;
    }
}
