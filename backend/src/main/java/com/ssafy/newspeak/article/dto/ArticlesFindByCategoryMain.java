package com.ssafy.newspeak.article.dto;

import com.ssafy.newspeak.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ArticlesFindByCategoryMain {
    private Long categoryId;
    private List<ArticleFindByCategoryMain> articleList;

    public ArticlesFindByCategoryMain(Category category, List<ArticleFindByCategoryMain> articles) {
        this.categoryId= category.getId(); // 카테고리 이름 설정
        this.articleList = articles;
    }
}
