package com.ssafy.newspeak.elastic.repository;

import com.ssafy.newspeak.elastic.entity.ArticleDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


import java.util.List;

public interface ArticleSearchRepository extends ElasticsearchRepository<ArticleDocument, Long> {

    Page<ArticleDocument> findByTitle(String title, Pageable pageable);

    // Sentences 필드에서 키워드를 포함한 문서를 찾는 메서드
    @Query("{\"wildcard\": {\"sentences.*\": \"*?0*\"}}")
    Page<ArticleDocument> findByContent(String keyword, Pageable pageable);

    // Translated_sentences 필드에서 키워드를 포함한 문서를 찾는 메서드
    @Query("{\"wildcard\": {\"translated_sentences.*\": \"*?0*\"}}")
    Page<ArticleDocument> findByTranslatedContent(String keyword, Pageable pageable);
}
