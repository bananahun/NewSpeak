package com.ssafy.newspeak.user.entity.userArticle;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user_article")
public class UserArticle {

    @EmbeddedId
    private UserArticleId userArticleId;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id", referencedColumnName = "article_id")
    private Article article;

    public static UserArticle of(UserArticleId userArticleId, User user, Article article) {
        UserArticle userArticle = new UserArticle();
        userArticle.userArticleId = userArticleId;
        userArticle.user = user;
        userArticle.article = article;
        return userArticle;
    }

}
