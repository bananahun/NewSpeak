package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.category.repository.CategoryRepository;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.entity.userCategory.UserCategoryId;
import com.ssafy.newspeak.user.repository.UserCategoryRepo;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCategoryService {
    private final UserCategoryRepo userCategoryRepo;
    private final UserRepo userRepo;
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategoriesByUserId(Long userId) {

        List<CategoryDto> userCategories=userCategoryRepo.findAllCategoryDtoByUserId(userId);
        return userCategories;
    }

    public void updateCategoriesByUserId(Long userId,List<UserCategoryId> userCategoryIds) {
        // 기존 관계 제거
        userCategoryRepo.deleteByUserId(userId);

        // 새로 선택한 카테고리와의 관계 추가
        for (UserCategoryId userCategoryId : userCategoryIds) {
            UserCategory userCategory=makeUserCategory(userCategoryId);
            userCategoryRepo.save(userCategory);
        }
    }

    public UserCategory makeUserCategory(UserCategoryId userCategoryId) {
        User user=userRepo.findById(userCategoryId.getUserId()).orElseThrow(NoSuchElementException::new);
        Category category=categoryRepository.findById(userCategoryId.getCategoryId()).orElseThrow(NoSuchElementException::new);
        return UserCategory.of(userCategoryId,user,category);
    }
}
