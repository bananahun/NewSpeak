package com.ssafy.newspeak.keyword.service;

import com.ssafy.newspeak.keyword.dto.KeywordsFindResponse;
import com.ssafy.newspeak.keyword.entity.Keyword;
import com.ssafy.newspeak.keyword.repository.KeywordRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;

    public List<KeywordsFindResponse> findAll() {
        List<Keyword> keywords = keywordRepository.findAll();
        List<KeywordsFindResponse> keywordsFindResponses = new ArrayList<>();
        for (Keyword keyword : keywords) {
            KeywordsFindResponse keywordsFindResponse = KeywordsFindResponse.from(keyword);
            keywordsFindResponses.add(keywordsFindResponse);
        }

        return keywordsFindResponses;
    }

    public long save(Keyword keyword) {
        keywordRepository.save(keyword);
        return keyword.getId();
    }

    public long delete(long id) {
        keywordRepository.findById(id)
                .ifPresent(keywordRepository::delete);

        return id;
    }

    public void deleteAll() { keywordRepository.deleteAll(); }
}
