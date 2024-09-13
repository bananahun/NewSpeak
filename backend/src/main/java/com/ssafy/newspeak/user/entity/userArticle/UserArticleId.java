package com.ssafy.newspeak.user.entity.userArticle;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserArticleId implements Serializable {
    @Column(name="user_id")
    private Long userId;
    @Column(name="article_id")
    private Long articleId;
}
