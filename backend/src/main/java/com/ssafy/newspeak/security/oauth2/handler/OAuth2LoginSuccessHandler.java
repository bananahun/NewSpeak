package com.ssafy.newspeak.security.oauth2.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.security.oauth2.CustomOAuth2User;
import com.ssafy.newspeak.security.util.CookieName;
import com.ssafy.newspeak.user.entity.Role;
import com.ssafy.newspeak.user.entity.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
//@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Value("${signUpUrl}")
    private String signUpUrl;

    @Value("${mainUrl}")
    private String mainUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if(oAuth2User.getRole() == Role.GUEST) {

                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(), oAuth2User.getUserId());
                String refreshToken = jwtService.createRefreshToken(oAuth2User.getUserId());

                jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
                jwtService.updateRefreshToken(oAuth2User.getUserId(), refreshToken);
                log.info("signUpUrl :{}",signUpUrl);

                response.sendRedirect(signUpUrl);
            } else {
                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
                response.sendRedirect(mainUrl);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(),oAuth2User.getUserId());
        String refreshToken = jwtService.createRefreshToken(oAuth2User.getUserId());

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getUserId(), refreshToken);
    }
}
