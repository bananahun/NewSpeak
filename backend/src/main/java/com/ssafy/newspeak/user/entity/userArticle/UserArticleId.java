package com.ssafy.newspeak.user.entity.userArticle;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserArticleId implements Serializable {
    private Long userId;
    private Long articleId;
}
