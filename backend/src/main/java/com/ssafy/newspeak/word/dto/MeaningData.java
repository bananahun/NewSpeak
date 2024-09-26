package com.ssafy.newspeak.word.dto;

import com.ssafy.newspeak.word.entity.WordMeaning;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeaningData {
    private String meaning;
    private String example;
    private String exampleKorean;

    public MeaningData(WordMeaning wordMeaning) {
        this.meaning = wordMeaning.getMeaning();
        this.example=wordMeaning.getMeaningSentence().getMeaningSentence();
        this.exampleKorean=wordMeaning.getMeaningSentence().getSentenceKorean();
    }
}
