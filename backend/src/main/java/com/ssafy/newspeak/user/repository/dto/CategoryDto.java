package com.ssafy.newspeak.user.repository.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CategoryDto {
    private Long categoryId;
    private String categoryName;
}
