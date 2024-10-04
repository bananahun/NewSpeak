package com.ssafy.newspeak.word.service;

import com.ssafy.newspeak.word.dto.WordMeaningFindResponse;
import com.ssafy.newspeak.word.entity.MeaningSentence;
import com.ssafy.newspeak.word.entity.Word;
import com.ssafy.newspeak.word.entity.WordMeaning;
import com.ssafy.newspeak.word.repository.MeaningSentenceRepository;
import com.ssafy.newspeak.word.repository.WordMeaningRepository;
import com.ssafy.newspeak.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;
    private final MeaningSentenceRepository meaningSentenceRepository;
    private final WordMeaningRepository wordMeaningRepository;

    public WordMeaningFindResponse findMeaningByContent(String content) {
        Word word = wordRepository.findByContent(content);
        List<WordMeaning> meanings = wordMeaningRepository.findByWordId(word.getId());

        List<MeaningSentence> sentences = word.getWordMeanings().stream()
                .map(meaning -> meaningSentenceRepository.findByWordMeaningId(meaning.getId()))
                .collect(Collectors.toList());

        return WordMeaningFindResponse.from(word, meanings, sentences);
    }

    public void save(Word word) { wordRepository.save(word); }

    public void deleteAll() { wordRepository.deleteAll(); }
}
