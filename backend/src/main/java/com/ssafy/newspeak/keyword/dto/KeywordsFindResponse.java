package com.ssafy.newspeak.keyword.dto;

import com.ssafy.newspeak.keyword.entity.Keyword;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KeywordsFindResponse {

    private Long id;
    private String content;
    private Integer cnt;

    public static KeywordsFindResponse from(Keyword keyword) {
        KeywordsFindResponse keywordsFindResponse = new KeywordsFindResponse();
        keywordsFindResponse.id = keyword.getId();
        keywordsFindResponse.content = keyword.getContent();
        keywordsFindResponse.cnt = keyword.getCnt();
        return keywordsFindResponse;
    }
}
