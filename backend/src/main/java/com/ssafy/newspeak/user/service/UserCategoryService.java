package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.repository.UserCategoryRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCategoryService {
    private final UserCategoryRepo userCategoryRepo;

    public List<UserCategory> getAll(Long userId) {

        List<UserCategory> userCategories=userCategoryRepo.findAllByUserId(userId);

    }
}
