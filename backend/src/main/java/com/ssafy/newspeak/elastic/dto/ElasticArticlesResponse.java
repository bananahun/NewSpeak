package com.ssafy.newspeak.elastic.dto;

import com.ssafy.newspeak.elastic.document.ArticleDocument;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ElasticArticlesResponse {

    private Long id;
    private String title;
    private String categoryName;
    private String imageUrl;
    private String writer;
    private String publisher;
    private Integer level;
    private String publishedDate;

    // Page<ArticleDocument>에서 각각의 ArticleDocument를 ElasticArticlesResponse로 변환
    public static List<ElasticArticlesResponse> from(Page<ArticleDocument> documents) {
        // 각 ArticleDocument를 ElasticArticlesResponse로 변환하고, 리스트로 반환
        return documents.stream()
                .map(document -> {
                    ElasticArticlesResponse response = new ElasticArticlesResponse();
                    response.id = document.getId();  // id가 String이라 Long으로 변환
                    response.title = document.getTitle();
                    response.categoryName = document.getCategory();
                    response.imageUrl = document.getImageUrl();
                    response.level = document.getLevel();
                    response.writer = document.getWriter();
                    response.publisher = document.getPublisher();
                    response.publishedDate = document.getPublishedDate();
                    return response;
                })
                .collect(Collectors.toList());
    }
}
