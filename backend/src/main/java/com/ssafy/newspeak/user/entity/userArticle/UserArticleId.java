package com.ssafy.newspeak.user.entity.userArticle;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserArticleId implements Serializable {
    private Long userId;
    private Long articleId;

    @Builder
    public UserArticleId(Long userId, Long articleId) {
        this.userId = userId;
        this.articleId = articleId;
    }
}
