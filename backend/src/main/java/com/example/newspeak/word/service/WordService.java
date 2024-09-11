package com.example.newspeak.word.service;

import com.example.newspeak.word.dto.WordMeaningFindResponse;
import com.example.newspeak.word.entity.MeaningSentence;
import com.example.newspeak.word.entity.Word;
import com.example.newspeak.word.entity.WordMeaning;
import com.example.newspeak.word.repository.MeaningSentenceRepository;
import com.example.newspeak.word.repository.WordMeaningRepository;
import com.example.newspeak.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
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
        List<MeaningSentence> sentences = meanings.stream()
                .map(meaning -> meaningSentenceRepository.findByWordMeaningId(meaning.getId()))
                .collect(Collectors.toList());

        return WordMeaningFindResponse.from(word, meanings, sentences);
    }

    public void save(Word word) { wordRepository.save(word); }

    public void deleteAll() { wordRepository.deleteAll(); }
}
