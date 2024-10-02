package com.ssafy.newspeak.elastic.service;

import com.ssafy.newspeak.elastic.document.ArticleDocument;
import com.ssafy.newspeak.elastic.dto.ElasticArticlesResponse;
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

    public List<ElasticArticlesResponse> searchByTitle(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByTitle(keyword, pageable));
    }

    public List<ElasticArticlesResponse> searchByContent(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByContent(keyword, pageable));
    }

    public List<ElasticArticlesResponse> searchByTranslatedContent(String keyword, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByTranslatedContent(keyword, pageable));
    }
}
