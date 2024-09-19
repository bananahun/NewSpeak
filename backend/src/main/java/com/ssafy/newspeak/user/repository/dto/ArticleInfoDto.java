package com.ssafy.newspeak.user.repository.dto;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class ArticleInfoDto {
    String title;
    LocalDateTime publishedDate;
}
