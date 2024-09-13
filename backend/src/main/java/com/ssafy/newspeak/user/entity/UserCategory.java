package com.ssafy.newspeak.user.entity;

import com.ssafy.newspeak.category.entity.Category;
import jakarta.persistence.*;

@Entity
@Table(name="user_category")
@IdClass(UserCategoryId.class)
public class UserCategory {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;
}
