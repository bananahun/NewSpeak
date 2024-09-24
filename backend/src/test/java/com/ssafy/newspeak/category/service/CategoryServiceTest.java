package com.ssafy.newspeak.category.service;


import com.ssafy.newspeak.category.dto.CategoryFindResponse;
import com.ssafy.newspeak.category.entity.Category;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    private Category category1;
    private Category category2;

    @BeforeEach
    void setUp() {
        category1 = Category.builder().categoryName("카테고리 1").build();
        category2 = Category.builder().categoryName("카테고리 2").build();

        categoryService.save(category1);
        categoryService.save(category2);
    }

    @AfterEach
    void tearDown() {
        categoryService.deleteAll();
    }

    @Test
    @DisplayName("전체 카테고리 조회")
    void findAll() {
        // when
        List<CategoryFindResponse> categories = categoryService.findAll();

        // then
        assertEquals(2, categories.size());
        assertEquals(category1.getId(), categories.get(0).getId());
        assertEquals(category2.getId(), categories.get(1).getId());
    }
}