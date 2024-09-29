package com.ssafy.newspeak.article.dto;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.sentence.entity.Sentence;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleSentence {
    private Long id;
    private String content;
    private String translation;
    private long order;
    public static List<ArticleSentence> from(List<Sentence> sentences) {
        return sentences.stream()
                .map(sentence -> new ArticleSentence(
                        sentence.getId(),
                        sentence.getContent(),
                        sentence.getTranslation(),
                        sentence.getOrder()
                ))
                .collect(Collectors.toList());
    }
}
