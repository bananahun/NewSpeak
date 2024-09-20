package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.article.repository.ArticleRepository;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import com.ssafy.newspeak.user.entity.userArticle.UserArticleId;
import com.ssafy.newspeak.user.repository.UserArticleRepo;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.user.repository.dto.ArticleInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class UserArticleService {
    private final UserArticleRepo userArticleRepo;
    private final UserRepo userRepo;
    private final ArticleRepository articleRepo;

    public Page<ArticleInfoDto> getAllUserArticles(Long userId, Pageable pageable) {
        return userArticleRepo.findArticleInfoDtoByUserId(userId,pageable);
    }

    public void scrapArticle(UserArticleId userArticleId) {
        UserArticle userArticle=makeUserArticleById(userArticleId);
        userArticleRepo.save(userArticle);
    }

    private UserArticle makeUserArticleById(UserArticleId userArticleId) {
        User user=userRepo.findById(userArticleId.getUserId()).orElseThrow(NoSuchElementException::new);
        Article article=articleRepo.findById(userArticleId.getArticleId()).orElseThrow(NoSuchElementException::new);
        return UserArticle.of(userArticleId,user,article);
    }

}
