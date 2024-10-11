package com.ssafy.newspeak.sentence.dto;

import com.ssafy.newspeak.sentence.entity.Sentence;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SentenceKoreanResponse {

    private Long id;
    private String content;
    private String translation;
    private Long articleId;

    public static SentenceKoreanResponse from(Sentence sentence) {
        SentenceKoreanResponse sentenceKoreanResponse = new SentenceKoreanResponse();
        sentenceKoreanResponse.id = sentence.getId();
        sentenceKoreanResponse.content = sentence.getContent();
        sentenceKoreanResponse.translation = sentence.getTranslation();
        sentenceKoreanResponse.articleId = sentence.getArticle().getId();
        return sentenceKoreanResponse;
    }
}
