package com.ssafy.newspeak.elastic.service;

import com.ssafy.newspeak.elastic.entity.ArticleDocument;
import com.ssafy.newspeak.elastic.repository.ArticleSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleSearchService {

    private final ArticleSearchRepository articleSearchRepository;

    public Page<ArticleDocument> searchByTitle(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return articleSearchRepository.findByTitle(keyword, pageable);
    }

    public Page<ArticleDocument> searchByContent(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return articleSearchRepository.findByContent(keyword, pageable);
    }

    public Page<ArticleDocument> searchByTranslatedContent(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return articleSearchRepository.findByTranslatedContent(keyword, pageable);
    }
}
