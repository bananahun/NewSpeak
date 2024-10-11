package com.ssafy.newspeak.article.dto;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.entity.Category;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ArticlesFindResponse {

    private Long id;
    private String title;
    private Long categoryId;
    private String imageUrl;
    private String writer;
    private String publisher;
    private Integer level;
    private LocalDateTime publishedDate;

    public static ArticlesFindResponse from(Article article) {
        ArticlesFindResponse articlesFindResponse = new ArticlesFindResponse();
        articlesFindResponse.id = article.getId();
        articlesFindResponse.title = article.getTitle();
        articlesFindResponse.categoryId = article.getCategory().getId();
        articlesFindResponse.imageUrl = article.getImageUrl();
        articlesFindResponse.level = article.getLevel();
        articlesFindResponse.writer = article.getWriter();
        articlesFindResponse.publisher = article.getPublisher();
        articlesFindResponse.publishedDate = article.getPublishedDate();
        return articlesFindResponse;
    }
}
