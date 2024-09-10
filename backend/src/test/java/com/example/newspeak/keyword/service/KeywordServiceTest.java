package com.example.newspeak.keyword.service;

import com.example.newspeak.article.entity.Article;
import com.example.newspeak.article.service.ArticleService;
import com.example.newspeak.keyword.dto.KeywordsFindResponse;
import com.example.newspeak.keyword.entity.Keyword;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class KeywordServiceTest {

    @Autowired
    private KeywordService keywordService;

    @Autowired
    private ArticleService articleService;

    private Article article;

    @BeforeEach
    void setUp() {
        article = Article.builder().title("제목1").content("내용1").level(0).build();
        articleService.save(article);

        Keyword keyword1 = Keyword.builder().content("단어1").cnt(2).build();
        Keyword keyword2 = Keyword.builder().content("단어2").cnt(3).build();
        Keyword keyword3 = Keyword.builder().content("단어3").cnt(5).build();
        keywordService.save(keyword1);
        keywordService.save(keyword2);
        keywordService.save(keyword3);
    }

    @AfterEach
    void tearDown() {
        articleService.deleteAll();
        keywordService.deleteAll();
    }

    @Test
    @DisplayName("워드 클라우드 만들기 위한 전체 주요단어 조회")
    void findAll() {
        // when
        List<KeywordsFindResponse> response = keywordService.findAll();

        // then
        assertEquals(3, response.size(), "반환 단어 수 오류");
        assertEquals("단어3", response.get(0).getContent(), "단어 정렬 오류");
        assertEquals("단어2", response.get(1).getContent(), "단어 정렬 오류");
        assertEquals("단어1", response.get(2).getContent(), "단어 정렬 오류");
    }
}