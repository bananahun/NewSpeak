package com.ssafy.newspeak.article.dto;

import com.ssafy.newspeak.article.entity.Article;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleFindByCategoryMain {
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

    public static ArticleFindByCategoryMain from(Article article) {
        ArticleFindByCategoryMain articleFindResponse = new ArticleFindByCategoryMain();
        articleFindResponse.setId(article.getId());
        articleFindResponse.setTitle(article.getTitle());
        articleFindResponse.setContent(article.getContent());
        articleFindResponse.setContentKr(article.getContentKr());
        articleFindResponse.setPublishedDate(article.getPublishedDate());
        articleFindResponse.setImageUrl(article.getImageUrl());
        articleFindResponse.setArticleUrl(article.getArticleUrl());
        articleFindResponse.setPublisher(article.getPublisher());
        articleFindResponse.setWriter(article.getWriter());
        articleFindResponse.setLevel(article.getLevel());
        articleFindResponse.setCreatedAt(article.getCreatedAt());
        return articleFindResponse;
    }
}
