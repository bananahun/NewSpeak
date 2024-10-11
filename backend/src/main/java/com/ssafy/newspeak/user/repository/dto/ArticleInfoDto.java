package com.ssafy.newspeak.user.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ArticleInfoDto {
    Long id;
    String title;
    LocalDateTime publishedDate;
    String imageUrl;
    String publisher;

}
