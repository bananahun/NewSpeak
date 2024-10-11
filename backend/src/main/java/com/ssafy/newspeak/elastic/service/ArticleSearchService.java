package com.ssafy.newspeak.elastic.service;

import com.ssafy.newspeak.elastic.dto.ElasticArticlesResponse;
import com.ssafy.newspeak.elastic.repository.ArticleSearchRepository;
import lombok.RequiredArgsConstructor;
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

    public List<ElasticArticlesResponse> searchByDate(String startDate, String endDate, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByDate(startDate, endDate, pageable));
    }

    public List<ElasticArticlesResponse> searchByTitleContent(String title, String content, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByTitleContainingOrContentContaining(title, content, pageable));
    }

    public List<ElasticArticlesResponse> searchByTitleDate(String startDate, String endDate, String title, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByDateAndTitle(startDate, endDate, title, pageable));
    }

    public List<ElasticArticlesResponse> searchByContentDate(String startDate, String endDate, String content, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByDateAndContent(startDate, endDate, content, pageable));
    }

    public List<ElasticArticlesResponse> searchByTitleContentDate(String startDate, String endDate, String title, String content, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ElasticArticlesResponse.from(articleSearchRepository.findByDateAndTitleOrContent(startDate, endDate, title, content, pageable));
    }
}
