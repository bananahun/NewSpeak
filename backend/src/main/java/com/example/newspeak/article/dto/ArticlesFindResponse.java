package com.example.newspeak.article.dto;

import com.example.newspeak.article.entity.Article;
import com.example.newspeak.category.entity.Category;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ArticlesFindResponse {

    private Long id;
    private String title;
    private String content;
    private Category category;
    private String imageUrl;
    private String writer;
    private String publisher;
    private Integer level;
    private LocalDateTime publishedDate;

    public static ArticlesFindResponse from(Article article) {
        ArticlesFindResponse articlesFindResponse = new ArticlesFindResponse();
        articlesFindResponse.id = article.getId();
        articlesFindResponse.title = article.getTitle();
        articlesFindResponse.content = article.getContent();
        articlesFindResponse.category = article.getCategory();
        articlesFindResponse.imageUrl = article.getImageUrl();
        articlesFindResponse.level = article.getLevel();
        articlesFindResponse.writer = article.getWriter();
        articlesFindResponse.publisher = article.getPublisher();
        articlesFindResponse.publishedDate = article.getPublishedDate();
        return articlesFindResponse;
    }
}
