package com.ssafy.newspeak.user.entity.userCategory;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;

@Entity
@Table(name="user_category")
public class UserCategory {

    @EmbeddedId
    private UserCategoryId userCategoryId;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;
}
