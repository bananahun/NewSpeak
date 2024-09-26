package com.ssafy.newspeak.article.service;

import com.ssafy.newspeak.article.dto.ArticleFindResponse;
import com.ssafy.newspeak.article.dto.ArticlesFindResponse;
import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.category.service.CategoryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class ArticleServiceTest {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CategoryService categoryService;

    private Article article1;
    private Article article2;

    private Category category1;
    private Category category2;

    // 테스트 실행 전에 공통적으로 사용할 데이터를 생성
    @BeforeEach
    void setUp() {
        category1 = Category.builder().categoryName("카테고리 1").build();
        category2 = Category.builder().categoryName("카테고리 2").build();
        categoryService.save(category1);
        categoryService.save(category2);

        article1 = Article.builder().title("제목1").content("내용1").level(0).category(category1).build();
        article2 = Article.builder().title("제목2").content("내용2").level(1).category(category2).build();
        articleService.save(article1);
        articleService.save(article2);
    }

    // 각 테스트 실행 후에 공통적인 정리 작업
    @AfterEach
    void tearDown() {
        articleService.deleteAll();
        categoryService.deleteAll();
    }

    @Test
    @DisplayName("전체 기사 조회")
    void findAll() {
        // when
        List<ArticlesFindResponse> response = articleService.findAll();

        // then
        assertEquals(2, response.size(), "반환된 기사 수가 맞지 않습니다.");
        assertEquals("제목1", response.get(0).getTitle(), "첫 번째 기사의 제목이 맞지 않습니다.");
        assertEquals("제목2", response.get(1).getTitle(), "두 번째 기사의 제목이 맞지 않습니다.");
    }

    @Test
    @DisplayName("전체 기사 레벨로 조회")
    void findByLevel() {
        // when
        List<ArticlesFindResponse> articles1 = articleService.findByLevel(0);
        List<ArticlesFindResponse> articles2 = articleService.findByLevel(1);
        List<ArticlesFindResponse> articles3 = articleService.findByLevel(2);

        // then
        assertThat(articles1).hasSize(1);
        assertThat(articles1.get(0).getTitle()).isEqualTo("제목1");
        assertThat(articles1.get(0).getLevel()).isEqualTo(0);

        assertThat(articles2).hasSize(1);
        assertThat(articles2.get(0).getTitle()).isEqualTo("제목2");
        assertThat(articles2.get(0).getLevel()).isEqualTo(1);

        assertThat(articles3).isEmpty();
    }

    @Test
    @DisplayName("전체 기사 제목으로 조회")
    void findByTitle() {
        // when
        List<ArticlesFindResponse> articles1 = articleService.findByTitle("제목");
        List<ArticlesFindResponse> articles2 = articleService.findByTitle("제목1");
        List<ArticlesFindResponse> articles3 = articleService.findByTitle("제목3");

        // then
        assertThat(articles1).hasSize(2);
        assertThat(articles1.get(0).getTitle()).isEqualTo("제목1");
        assertThat(articles1.get(1).getTitle()).isEqualTo("제목2");

        assertThat(articles2).hasSize(1);
        assertThat(articles2.get(0).getTitle()).isEqualTo("제목1");

        assertThat(articles3).isEmpty();
    }

    @Test
    @DisplayName("전체 기사 카테고리로 조회")
    void findByCategory() {
        // when
        List<ArticlesFindResponse> articles1 = articleService.findByCategory(category1.getId(),1);
        List<ArticlesFindResponse> articles2 = articleService.findByCategory(category2.getId(),2);
        List<ArticlesFindResponse> articles3 = articleService.findByCategory(3L,1);

        // then
        assertThat(articles1).hasSize(1);
        assertThat(articles1.get(0).getTitle()).isEqualTo("제목1");
        assertThat(articles2).hasSize(1);
        assertThat(articles2.get(0).getTitle()).isEqualTo("제목2");
        assertThat(articles3).isEmpty();
    }

    @Test
    @DisplayName("단일 기사 조회")
    void findById() {
        // when
        ArticleFindResponse response = articleService.findById(article1.getId());

        // then
        assertEquals(article1.getId(), response.getId(), "기사 ID가 맞지 않습니다.");
        assertEquals("제목1", response.getTitle(), "기사 제목이 맞지 않습니다.");
    }

    @Test
    @DisplayName("단일 기사 삭제")
    void delete() {
        // when
        long deletedId = articleService.delete(article1.getId());

        // then
        assertThatThrownBy(() -> articleService.findById(deletedId))
                .isInstanceOf(RuntimeException.class);
    }
}
