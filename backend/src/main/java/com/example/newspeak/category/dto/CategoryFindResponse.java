package com.example.newspeak.category.dto;

import com.example.newspeak.category.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryFindResponse {

    private Long id;
    private String name;

    public static CategoryFindResponse from(Category category) {
        CategoryFindResponse categoryFindResponse = new CategoryFindResponse();
        categoryFindResponse.id = category.getId();
        categoryFindResponse.name = category.getCategoryName();
        return categoryFindResponse;
    }
}