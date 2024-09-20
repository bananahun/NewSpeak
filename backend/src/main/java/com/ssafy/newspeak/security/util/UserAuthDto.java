package com.ssafy.newspeak.security.util;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Getter
public class UserAuthDto {
    private String email;
    private String nickname;
    private Long userId;
    private String password;
    private List<GrantedAuthority> authorities;
}
