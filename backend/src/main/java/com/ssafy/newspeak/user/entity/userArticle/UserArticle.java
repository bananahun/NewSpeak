package com.ssafy.newspeak.user.entity.userArticle;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;

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

}
