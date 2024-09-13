package com.ssafy.newspeak.user.entity.userCategory;

import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;

@Entity
@Table(name="user_category")
public class UserCategory {

    @EmbeddedId
    private UserCategoryId userCategoryId;

//    @Id
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="user_id")
//    private User user;
//
//    @Id
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="category_id")
//    private Category category;
}
