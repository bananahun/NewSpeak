package com.ssafy.newspeak.user.controller.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class UserCategoryRequest {
    private List<Long> categoryIds;
}
