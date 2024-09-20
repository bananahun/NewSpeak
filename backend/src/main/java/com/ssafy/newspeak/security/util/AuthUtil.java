package com.ssafy.newspeak.security.util;

import com.ssafy.newspeak.exception.BusinessException;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.oauth2.CustomOAuth2User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.ssafy.newspeak.exception.ErrorCode.UNAUTHORIZED;

public class AuthUtil {

    // EXP : 인증 객체에 담긴 UserAuthDto 반환
    public static MyUserDetails getUserDetails() throws BusinessException{
        Authentication authentication = SecurityContextHolder.getContextHolderStrategy().getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if(principal instanceof MyUserDetails) {
            return (MyUserDetails) principal;
        }
        throw new BusinessException(UNAUTHORIZED, "로그인 정보를 읽을 수 없습니다.");
//        throw new IllegalAccessException("로그인 정보 없음");
    }
}