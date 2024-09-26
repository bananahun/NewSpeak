package com.ssafy.newspeak.voca.repository.dto;

import com.ssafy.newspeak.word.dto.MeaningData;
import com.ssafy.newspeak.word.entity.Word;
import com.ssafy.newspeak.word.entity.WordMeaning;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class WordDetail {
    private Long wordId;
    private String content;
    private Integer level;

    private LocalDateTime createdAt;

    private List<MeaningData> meaningDatas;
    public WordDetail(Word word) {
        this.wordId = word.getId();
        this.content = word.getContent();
        this.level = word.getLevel();
        this.createdAt = word.getCreatedAt();
        this.meaningDatas =word.getWordMeanings().stream().map(MeaningData::new).toList();
    }

    public static List<WordDetail> from(List<Word> words) {
        return words.stream().map(WordDetail::new).toList();
    }
}
