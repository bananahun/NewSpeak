package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import com.ssafy.newspeak.user.repository.UserArticleRepo;
import com.ssafy.newspeak.user.repository.dto.ArticleInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserArticleService {
    private final UserArticleRepo userArticleRepo;

    public Page<ArticleInfoDto> getAllUserArticles(Long userId, Pageable pageable) {
        return userArticleRepo.findArticleInfoDtoByUserId(userId,pageable);
    }

}
