package com.ssafy.newspeak.user.entity.userVoca;

import com.ssafy.newspeak.article.entity.Article;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.entity.userArticle.UserArticleId;
import com.ssafy.newspeak.voca.entity.Voca;
import jakarta.persistence.*;

@Entity
@Table(name="user_voca")
public class UserVoca {

    @EmbeddedId
    private UserVocaId userVocaId;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @MapsId("vocaId")
    @JoinColumn(name = "voca_id", referencedColumnName = "voca_id")
    private Voca voca;

}