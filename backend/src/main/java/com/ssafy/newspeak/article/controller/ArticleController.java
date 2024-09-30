package com.ssafy.newspeak.article.controller;

import com.ssafy.newspeak.article.dto.*;
import com.ssafy.newspeak.article.service.ArticleService;
import com.ssafy.newspeak.article.dto.ArticleFindResponse;
import com.ssafy.newspeak.article.dto.ArticlesFindResponse;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.entity.userArticle.UserArticleId;
import com.ssafy.newspeak.user.service.UserArticleService;
import com.ssafy.newspeak.voca.service.VocaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ArticleController {

    private final ArticleService articleService;
    private final UserArticleService userArticleService;
    private final VocaService vocaService;

    @PostMapping("/{articleId}/scrap")
    @ResponseStatus(HttpStatus.OK)
    public void scrapArticle(@PathVariable Long articleId) {
        MyUserDetails userDetails= AuthUtil.getUserDetails();
        UserArticleId userArticleId=UserArticleId.builder()
                .articleId(articleId)
                .userId(userDetails.getUserId())
                .build();
        userArticleService.scrapArticle(userArticleId);
    }

    @DeleteMapping("/{articleId}/scrap")
    @ResponseStatus(HttpStatus.OK)
    public void unscrapArticle(@PathVariable Long articleId) {
        MyUserDetails userDetails= AuthUtil.getUserDetails();
        userArticleService.unscrapArticle(UserArticleId.builder()
                .userId(userDetails.getUserId())
                .articleId(articleId).build());
    }

    @PostMapping("/{articleId}/vocas")
    public void addWordFromArticle(@PathVariable Long articleId, @RequestBody AddWordRequest addWordRequest) {
        MyUserDetails userDetails= AuthUtil.getUserDetails();
        vocaService.addWord(addWordRequest,userDetails.getUserId());
    }

    @GetMapping
    public ResponseEntity<Result> findAll() {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findAll();
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/main")
    public ResponseEntity<Result> findMain() {
        List<ArticlesFindByCategoryMain> articleFindByCategoryMains = articleService.findByCategoryMains();
        int count = articleFindByCategoryMains.size();
        Result<List<ArticlesFindByCategoryMain>> result = new Result<>(count, articleFindByCategoryMains);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Result> findByCategory(@PathVariable("categoryId") Long categoryId
            ,@RequestParam("page") int page) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByCategory(categoryId, page);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/keyword/{keywordId}")
    public ResponseEntity<Result> findByKeyword(@PathVariable("keywordId") Long keywordId
    ,@RequestParam("page") int page) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByKeyword(keywordId, page);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<Result> findByLevel(@PathVariable("level") Integer level
    ,@RequestParam("page") int page) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByLevel(level, page);
        int count = articlesFindResponses.size();
        Result<List<ArticlesFindResponse>> result = new Result<>(count, articlesFindResponses);
        return ResponseEntity.status(OK).body(result);
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<Result> findByTitle(@PathVariable("title") String title
    ,@RequestParam("page") int page) {
        List<ArticlesFindResponse> articlesFindResponses = articleService.findByTitle(title, page);
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
