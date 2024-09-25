package com.ssafy.newspeak.user.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ArticleInfoDto {
    String title;
    LocalDateTime publishedDate;
}
