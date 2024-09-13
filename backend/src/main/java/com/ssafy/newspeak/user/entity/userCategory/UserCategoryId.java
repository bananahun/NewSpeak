package com.ssafy.newspeak.user.entity.userCategory;

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
public class UserCategoryId implements Serializable {
    @Column(name="user_id")
    private Long userId;
    @Column(name="category_id")
    private Long categoryId;
}
