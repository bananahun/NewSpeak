package com.ssafy.newspeak.keyword.dto;

import com.ssafy.newspeak.article.dto.ArticlesFindResponse;
import com.ssafy.newspeak.keyword.entity.Keyword;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class KeywordArticlesResponse {

    private Long keywordId;
    private List<ArticlesFindResponse> articles;

    public KeywordArticlesResponse from(Keyword keyword, List<ArticlesFindResponse> articles) {
        KeywordArticlesResponse keywordArticlesResponse = new KeywordArticlesResponse();
        this.keywordId = keyword.getId();
        this.articles = articles;
        return keywordArticlesResponse;
    }
}
