package com.example.newspeak.article.service;

import com.example.newspeak.article.dto.ArticleFindResponse;
import com.example.newspeak.article.dto.ArticlesFindResponse;
import com.example.newspeak.article.entity.Article;
import com.example.newspeak.article.repository.ArticleRepository;
import com.example.newspeak.article.service.ArticleService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @InjectMocks
    private ArticleService articleService;

    @Mock
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("전체 기사 조회")
    void findAll() {
        // given
        Article article1 = Article.builder().id(1L).title("제목1").content("내용1").build();
        Article article2 = Article.builder().id(2L).title("제목2").content("내용2").build();
        when(articleRepository.findAll()).thenReturn(Arrays.asList(article1, article2));

        // when
        List<ArticlesFindResponse> response = articleService.findAll();

        // then
        verify(articleRepository).findAll();

        assertEquals(2, response.size(), "반환된 기사 수가 맞지 않습니다.");
        assertEquals("제목1", response.get(0).getTitle(), "첫 번째 기사의 제목이 맞지 않습니다.");
        assertEquals("제목2", response.get(1).getTitle(), "두 번째 기사의 제목이 맞지 않습니다.");
    }

    @Test
    @DisplayName("단일 기사 조회")
    void findById() {
        // given
        Long id = 1L;
        Article article = Article.builder().id(id).title("제목").content("내용").build();
        when(articleRepository.findById(id)).thenReturn(Optional.of(article));

        // when
        ArticleFindResponse response = articleService.findById(id);

        // then
        verify(articleRepository).findById(id);

        assertEquals(id, response.getId(), "기사 ID가 맞지 않습니다.");
        assertEquals("제목", response.getTitle(), "기사 제목이 맞지 않습니다.");
    }

    @Test
    @DisplayName("단일 기사 삭제")
    void delete() {
        // given
        Long id = 1L;
        Article article = Article.builder().id(id).build();
        when(articleRepository.findById(id)).thenReturn(Optional.of(article));

        // when
        articleService.delete(id);

        // then
        verify(articleRepository).findById(id);
        verify(articleRepository).delete(article);
    }
}
