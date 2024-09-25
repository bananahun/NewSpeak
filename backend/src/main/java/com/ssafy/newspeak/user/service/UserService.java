package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.repository.UserArticleRepo;
import com.ssafy.newspeak.user.repository.UserCategoryRepo;
import com.ssafy.newspeak.user.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserArticleRepo userArticleRepo;
    private final UserCategoryRepo userCategoryRepo;

    public List<UserCategory> findUserCategoryAll(Long userId) {
        return userCategoryRepo.findAllByUserId(userId);
    }

    public List<UserArticle> findUserArticleAll(Long userId) {
//        return userArticleRepo.findAllByUserId(userId);
        return null;
    }
}
