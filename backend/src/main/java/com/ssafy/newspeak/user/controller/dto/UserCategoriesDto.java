package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.category.entity.Category;
import lombok.Getter;

import java.util.List;

@Getter
public class UserCategoriesDto {
    List<CategoryDto> categoryList;
}
