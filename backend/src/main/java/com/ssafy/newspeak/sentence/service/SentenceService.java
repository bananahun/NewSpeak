package com.ssafy.newspeak.sentence.service;


import com.ssafy.newspeak.sentence.dto.SentenceKoreanResponse;
import com.ssafy.newspeak.sentence.entity.Sentence;
import com.ssafy.newspeak.sentence.repository.SentenceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SentenceService {

    private final SentenceRepository sentenceRepository;

    public SentenceKoreanResponse findById(Long id) {
        Sentence sentence = sentenceRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        SentenceKoreanResponse sentenceKoreanResponse = SentenceKoreanResponse.from(sentence);
        return sentenceKoreanResponse;
    }

    public long save(Sentence sentence) {
        sentenceRepository.save(sentence);
        return sentence.getId();
    }

    public long delete(Long id) {
        sentenceRepository.findById(id)
                .ifPresent(sentenceRepository::delete);
        return id;
    }

    public void deleteAll() {
        sentenceRepository.deleteAll();
    }
}
