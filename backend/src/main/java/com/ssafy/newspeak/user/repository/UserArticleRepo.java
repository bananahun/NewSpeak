package com.ssafy.newspeak.user.repository;

import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import com.ssafy.newspeak.user.entity.userArticle.UserArticleId;
import com.ssafy.newspeak.user.repository.dto.ArticleInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserArticleRepo extends JpaRepository<UserArticle, UserArticleId> {
    @Query("SELECT new com.ssafy.newspeak.user.repository.dto.ArticleInfoDto(a.title, a.publishedDate) " +
            "FROM UserArticle ua JOIN ua.article a WHERE ua.user.id = :userId")
    Page<ArticleInfoDto> findArticleInfoDtoByUserId(@Param("userId") Long userId, Pageable pageable);

}
