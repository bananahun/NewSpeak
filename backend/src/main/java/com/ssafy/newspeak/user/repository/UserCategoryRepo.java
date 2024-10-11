package com.ssafy.newspeak.user.repository;

import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.entity.userCategory.UserCategoryId;
import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCategoryRepo extends JpaRepository<UserCategory, UserCategoryId> {
    @Query("SELECT new com.ssafy.newspeak.user.repository.dto.CategoryDto(c.id, c.categoryName) " +
            "FROM UserCategory uc JOIN uc.category c WHERE uc.user.id = :userId")
    List<CategoryDto> findAllCategoryDtoByUserId(Long userId);

    @Query("SELECT c.id " +
            "FROM UserCategory uc JOIN uc.category c WHERE uc.user.id = :userId")
    List<Long> findAllCategoryIdByUserId(Long userId);

    void deleteByUserId(Long userId);

}
