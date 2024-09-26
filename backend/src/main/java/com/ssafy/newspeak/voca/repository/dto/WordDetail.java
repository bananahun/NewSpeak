package com.ssafy.newspeak.voca.repository.dto;

import com.ssafy.newspeak.word.entity.WordMeaning;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class WordDetail {
    private String content;
    private List<WordMeaning> wordMeanings;
}
