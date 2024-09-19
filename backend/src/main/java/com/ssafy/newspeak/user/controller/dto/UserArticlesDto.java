package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.user.entity.User;

import java.util.List;

public class UserArticlesDto {
    List<Article> articles;
    User user;
}
