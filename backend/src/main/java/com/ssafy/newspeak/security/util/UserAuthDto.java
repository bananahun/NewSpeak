package com.ssafy.newspeak.security.util;

import lombok.Getter;

@Getter
public class UserAuthDto {
    private String email;
    private String nickname;
    private Long userId;
}
