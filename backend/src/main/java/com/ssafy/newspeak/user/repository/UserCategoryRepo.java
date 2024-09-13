package com.ssafy.newspeak.user.repository;

import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserCategoryRepo extends JpaRepository<UserCategory, Long> {
    List<UserCategory> findAllByUserId(Long userId);
}
