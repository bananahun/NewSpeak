package com.example.newspeak.word.dto;

import com.example.newspeak.word.entity.MeaningSentence;
import com.example.newspeak.word.entity.Word;
import com.example.newspeak.word.entity.WordMeaning;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Getter
@NoArgsConstructor
public class WordMeaningFindResponse {

    private Long id;
    private String word;
    private List<MeaningData> data;

    public static WordMeaningFindResponse from(Word word, List<WordMeaning> meanings, List<MeaningSentence> sentences) {
        WordMeaningFindResponse wordMeaningFindResponse = new WordMeaningFindResponse();
        wordMeaningFindResponse.id = word.getId();
        wordMeaningFindResponse.word = word.getContent();

        wordMeaningFindResponse.data = IntStream.range(0, meanings.size())
                .mapToObj(i -> new MeaningData(meanings.get(i).getMeaning(),
                        sentences.get(i).getMeaningSentence(),
                        sentences.get(i).getSentenceKorean()))
                .collect(Collectors.toList());

        return wordMeaningFindResponse;
    }
}
