package com.ssafy.newspeak.user.entity.userCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Embeddable
@Builder
public class UserCategoryId implements Serializable {

    private Long userId;

    private Long categoryId;

}
