package com.ssafy.newspeak.user.repository;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserArticleRepo extends JpaRepository<UserArticle, Long> {

    List<UserArticle> findAllByUserId(Long userId);
}
