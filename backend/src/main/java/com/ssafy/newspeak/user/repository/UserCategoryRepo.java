package com.ssafy.newspeak.user.repository;

import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.entity.userCategory.UserCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCategoryRepo extends JpaRepository<UserCategory, UserCategoryId> {
    List<UserCategory> findAllByUserId(Long userId);
}
