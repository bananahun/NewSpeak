package com.ssafy.newspeak.elastic.repository;

import com.ssafy.newspeak.elastic.document.ArticleDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleSearchRepository extends ElasticsearchRepository<ArticleDocument, Long> {

    Page<ArticleDocument> findByTitle(String title, Pageable pageable);

    Page<ArticleDocument> findByContent(String keyword, Pageable pageable);

    Page<ArticleDocument> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

    // Translated_sentences 필드에서 키워드를 포함한 문서를 찾는 메서드
    @Query("{\"bool\": {\"should\" : [{ \"multi_match\" : {\"query\" : \"?0\", \"fields\" : [\"translated_sentences.*\"], \"type\" : \"best_fields\"}}]}}")
    Page<ArticleDocument> findByTranslatedContent(String keyword, Pageable pageable);

    @Query("{\"range\":{\"published_date\":{\"gte\":\"?0\",\"lte\":\"?1\"}}}")
    Page<ArticleDocument> findByDate(String startDate, String endDate, Pageable pageable);

    // 날짜 범위와 내용을 모두 포함하는 쿼리
    @Query("{\"bool\": {\"must\": [{\"range\": {\"published_date\": {\"gte\": \"?0\", \"lte\": \"?1\"}}},{\"match\": {\"content\": \"?2\"}}]}}")
    Page<ArticleDocument> findByDateAndContent(String startDate, String endDate, String content, Pageable pageable);

    @Query("{\"bool\": {\"must\": [{\"range\": {\"published_date\": {\"gte\": \"?0\", \"lte\": \"?1\"}}}], \"should\": [{\"match\": {\"title\": \"?2\"}}]}}")
    Page<ArticleDocument> findByDateAndTitle(String startDate, String endDate, String title, Pageable pageable);

    // 날짜 범위와 제목 또는 내용을 포함하는 쿼리
    @Query("{\"bool\": {\"must\": [{\"range\": {\"published_date\": {\"gte\": \"?0\", \"lte\": \"?1\"}}}],\"should\": [{\"match\": {\"title\": \"?2\"}},{\"match\": {\"content\": \"?3\"}}]}}")
    Page<ArticleDocument> findByDateAndTitleOrContent(String startDate, String endDate, String title, String content, Pageable pageable);
}
