package com.ssafy.newspeak.word.service;

import com.ssafy.newspeak.word.dto.WordMeaningFindResponse;
import com.ssafy.newspeak.word.entity.MeaningSentence;
import com.ssafy.newspeak.word.entity.Word;
import com.ssafy.newspeak.word.entity.WordMeaning;
import com.ssafy.newspeak.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    // 단어와 단어 뜻을 Redis에 캐시
    @Cacheable(value = "wordMeanings", key = "#content", unless = "#result == null")
    public WordMeaningFindResponse findMeaningByContent(String content) {
        Word word = wordRepository.findByContent(content);

        if (word == null) {
            return null;  // 단어가 없을 경우 null 반환
        }

        List<MeaningSentence> sentences = word.getWordMeanings().stream()
                .map(WordMeaning::getMeaningSentence)
                .collect(Collectors.toList());

        return WordMeaningFindResponse.from(word, word.getWordMeanings(), sentences);
    }

    public void save(Word word) { wordRepository.save(word); }

    public void deleteAll() { wordRepository.deleteAll(); }
}
