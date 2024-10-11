package com.ssafy.newspeak.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Getter
@RequiredArgsConstructor
public enum Role implements GrantedAuthority {

    GUEST("ROLE_GUEST"), USER("ROLE_USER");

    private final String key;

    @Override
    public String getAuthority() {
        return this.key;
    }
}
