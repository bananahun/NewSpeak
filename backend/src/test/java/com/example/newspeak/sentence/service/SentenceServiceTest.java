package com.example.newspeak.sentence.service;

import com.example.newspeak.article.entity.Article;
import com.example.newspeak.article.service.ArticleService;
import com.example.newspeak.category.entity.Category;
import com.example.newspeak.category.service.CategoryService;
import com.example.newspeak.sentence.dto.SentenceKoreanResponse;
import com.example.newspeak.sentence.entity.Sentence;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class SentenceServiceTest {

    @Autowired
    private SentenceService sentenceService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CategoryService categoryService;

    private Article article;
    private Category category;

    private Sentence sentence1;
    private Sentence sentence2;
    private Sentence sentence3;

    @BeforeEach
    void setUp() {
        // 카테고리 생성 및 저장
        category = Category.builder().categoryName("카테고리").build();
        categoryService.save(category);

        // 기사 생성 및 저장
        article = Article.builder().title("제목1").content("내용").level(0).category(category).build();
        articleService.save(article);

        // 문장 생성 및 저장
        sentence1 = Sentence.builder().content("sentence1").translation("문장1").article(article).build();
        sentence2 = Sentence.builder().content("sentence2").translation("문장2").article(article).build();
        sentence3 = Sentence.builder().content("sentence3").translation("문장3").article(article).build();

        sentenceService.save(sentence1);
        sentenceService.save(sentence2);
        sentenceService.save(sentence3);
    }

    @AfterEach
    void tearDown() {
        // 삭제 순서: 종속된 엔티티 먼저 삭제 후 상위 엔티티 삭제
        sentenceService.deleteAll();  // 먼저 문장 삭제
        articleService.deleteAll();   // 다음으로 기사 삭제
        categoryService.deleteAll();  // 마지막으로 카테고리 삭제
    }

    @Test
    @DisplayName("단일 문장 조회")
    void findById() {
        // when: ID로 문장 조회
        SentenceKoreanResponse response1 = sentenceService.findById(sentence1.getId());
        SentenceKoreanResponse response2 = sentenceService.findById(sentence2.getId());

        // then: ID 및 다른 필드들을 검증
        assertEquals(sentence1.getId(), response1.getId());
        assertEquals(sentence1.getContent(), response1.getContent());
        assertEquals(sentence1.getTranslation(), response1.getTranslation());
        assertEquals(article.getId(), response1.getArticleId());

        assertEquals(sentence2.getId(), response2.getId());
        assertEquals(sentence2.getContent(), response2.getContent());
        assertEquals(sentence2.getTranslation(), response2.getTranslation());
        assertEquals(article.getId(), response2.getArticleId());
    }

    @Test
    @DisplayName("존재하지 않는 문장 조회 시 예외 발생")
    void findByIdNotFound() {
        // given: 존재하지 않는 ID로 조회 시도
        Long nonExistentId = 999L;

        // then: 예외 발생을 기대
        assertThatThrownBy(() -> sentenceService.findById(nonExistentId))
                .isInstanceOf(RuntimeException.class);
    }
}
