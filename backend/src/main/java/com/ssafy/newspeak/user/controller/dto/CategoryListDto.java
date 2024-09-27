package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import lombok.Getter;

import java.util.List;

@Getter
public class CategoryListDto {
    List<CategoryDto> categoryList;

    public CategoryListDto(List<CategoryDto> categoryList) {
        this.categoryList = categoryList;
    }
}
