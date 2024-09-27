package com.ssafy.newspeak.voca.service;

import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import com.ssafy.newspeak.word.dto.MeaningData;
import com.ssafy.newspeak.word.entity.Word;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class WordQuiz {
    private Long wordId;
    private String answer;
    private Integer level;

    private LocalDateTime createdAt;

    private List<MeaningData> meaningDatas;
    public WordQuiz(Word word) {
        this.wordId = word.getId();
        this.answer = word.getContent();
        this.level = word.getLevel();
        this.createdAt = word.getCreatedAt();
        this.meaningDatas =word.getWordMeanings().stream().map(MeaningData::new).toList();
    }

    public static List<WordQuiz> from(List<Word> words) {
        return words.stream().map(WordQuiz::new).toList();
    }
}
