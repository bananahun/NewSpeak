package com.example.newspeak.article.dto;

import com.example.newspeak.article.entity.Article;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleFindResponse {

    private Long id;
    private String title;
    private String content;
    private String contentKr;
    private LocalDateTime publishedDate;
    private String imageUrl;
    private String articleUrl;
    private String publisher;
    private String writer;
    private Integer level;
    private LocalDateTime createdAt;
    private String categoryName;

    public static ArticleFindResponse from(Article article) {
        ArticleFindResponse articleFindResponse = new ArticleFindResponse();
        articleFindResponse.id = article.getId();
        articleFindResponse.title = article.getTitle();
        articleFindResponse.content = article.getContent();
        articleFindResponse.contentKr = article.getContentKr();
        articleFindResponse.publishedDate = article.getPublishedDate();
        articleFindResponse.imageUrl = article.getImageUrl();
        articleFindResponse.articleUrl = article.getArticleUrl();
        articleFindResponse.publisher = article.getPublisher();
        articleFindResponse.writer = article.getWriter();
        articleFindResponse.level = article.getLevel();
        articleFindResponse.createdAt = article.getCreatedAt();
        articleFindResponse.categoryName = article.getCategory().getCategoryName();
        return articleFindResponse;
    }
}
