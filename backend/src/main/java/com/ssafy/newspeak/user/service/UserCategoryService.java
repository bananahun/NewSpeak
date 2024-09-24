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

        List<CategoryDto> userCategories=userCategoryRepo.findAllCategoryInfoByUserId(userId);
        return userCategories;
    }

    public void postCategoryByUserId(UserCategoryId userCategoryId) {
        User user=userRepo.findById(userCategoryId.getUserId()).orElseThrow(NoSuchElementException::new);
        Category category=categoryRepository.findById(userCategoryId.getCategoryId()).orElseThrow(NoSuchElementException::new);

        UserCategory userCategory=UserCategory.of(userCategoryId,user,category);
        userCategoryRepo.save(userCategory);
    }
}
