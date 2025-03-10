package com.ssafy.newspeak.security.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.ssafy.newspeak.user.repository.UserRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
@Transactional
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
     * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
     * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "email";
    private static final String USER_ID = "userId";
    private static final String BEARER = "Bearer ";

    private final UserRepo userRepo;

    /**
     * AccessToken 생성 메소드
     */
    public String createAccessToken(String email,Long userId) {
        Date now = new Date();
        return JWT.create() // JWT 토큰을 생성하는 빌더 반환
                .withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정

                //클레임으로는 저희는 email 하나만 사용합니다.
                //추가적으로 식별자나, 이름 등의 정보를 더 추가하셔도 됩니다.
                //추가하실 경우 .withClaim(클래임 이름, 클래임 값) 으로 설정해주시면 됩니다
                .withClaim(EMAIL_CLAIM, email)
                .withClaim(USER_ID,userId)
                .sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
    }

    /**
     * RefreshToken 생성
     * RefreshToken은 Claim에 email도 넣지 않으므로 withClaim() X
     */
    public String createRefreshToken(Long userId) {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withClaim(USER_ID,userId)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    /**
     * AccessToken 헤더에 실어서 보내기
     */
    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader, accessToken);
        log.info("재발급된 Access Token : {}", accessToken);
    }

    /**
     * AccessToken + RefreshToken 헤더에 실어서 보내기
     */
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenCookie(response, accessToken);
        setRefreshTokenCookie(response, refreshToken);
        log.info("Access Token, Refresh Token 쿠키 설정 완료");
    }

    /**
     * 헤더에서 RefreshToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    public Optional<String> extractRefreshToken(Cookie[] cookies) {
        Cookie[] toSee=cookies;
        return Optional.ofNullable(cookies) // 쿠키 배열이 null인 경우 처리
                .flatMap(cookiesArray -> Arrays.stream(cookiesArray) // 쿠키 배열을 스트림으로 변환
                        .filter(cookie -> "refreshToken".equals(cookie.getName())) // "accessToken" 이름으로 필터링
                        .findFirst() // 첫 번째 쿠키를 찾음
                        .map(Cookie::getValue) // 쿠키 값을 가져옴
                );
    }

    /**
     * 헤더에서 AccessToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        Enumeration<String> headerNames=request.getHeaderNames();
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    public Optional<String> extractAccessToken(Cookie[] cookies) {
        Cookie[] toSee=cookies;
        return Optional.ofNullable(cookies) // 쿠키 배열이 null인 경우 처리
                .flatMap(cookiesArray -> Arrays.stream(cookiesArray) // 쿠키 배열을 스트림으로 변환
                        .filter(cookie -> "accessToken".equals(cookie.getName())) // "accessToken" 이름으로 필터링
                        .findFirst() // 첫 번째 쿠키를 찾음
                        .map(Cookie::getValue) // 쿠키 값을 가져옴
                );
    }


    /**
     * AccessToken에서 Email 추출
     * 추출 전에 JWT.require()로 검증기 생성
     * verify로 AceessToken 검증 후
     * 유효하다면 getClaim()으로 이메일 추출
     * 유효하지 않다면 빈 Optional 객체 반환
     */
    public Optional<String> extractEmail(String accessToken) {
        try {
            Optional<Claim> emailClaim=Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
                    .getClaim(EMAIL_CLAIM));
            String email=emailClaim.get().asString();
            return Optional.of(email);
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    public Optional<Long> extractUserId(String accessToken) {
        try {
            Optional<Claim> userIdClaim=Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
                    .getClaim(USER_ID));
            Long userId=userIdClaim.get().asLong();
            return Optional.of(userId);
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    public void setAccessTokenCookie(HttpServletResponse response, String accessToken) {
        Cookie cookie = new Cookie("accessToken", accessToken);
        cookie.setHttpOnly(true); // XSS 공격 방지
        // cookie.setSecure(true);   // HTTPS에서만 전송되도록 설정
        cookie.setPath("/");      // 쿠키의 유효 경로 설정
        cookie.setMaxAge(3600); // 7일 유효 기간 설정
        // cookie.setDomain(".p.ssafy.io");
        // cookie.setAttribute("SameSite","None");
        response.addCookie(cookie);
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    public void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true); // XSS 공격 방지
        // cookie.setSecure(true);   // HTTPS에서만 전송되도록 설정
        cookie.setPath("/");      // 쿠키의 유효 경로 설정
        cookie.setMaxAge(172800); // 7일 유효 기간 설정
        // cookie.setDomain(".p.ssafy.io");
        // cookie.setAttribute("SameSite","None");
        response.addCookie(cookie);
    }

    public void setAccessTokenExpired(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setHttpOnly(true); // XSS 공격 방지
        // cookie.setSecure(true);   // HTTPS에서만 전송되도록 설정
        cookie.setPath("/");      // 쿠키의 유효 경로 설정
        cookie.setMaxAge(0); // 7일 유효 기간 설정
        // cookie.setAttribute("SameSite","None");
        response.addCookie(cookie);
    }

    public void setRefreshTokenExpired(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true); // XSS 공격 방지
        // cookie.setSecure(true);   // HTTPS에서만 전송되도록 설정
        cookie.setPath("/");      // 쿠키의 유효 경 로 설정
        cookie.setMaxAge(0); // 7일 유효 기간 설정
//        cookie.setSameSite("Strict"); // CSRF 방지
        // cookie.setAttribute("SameSite","None");
        response.addCookie(cookie);
    }

    /**
     * RefreshToken DB 저장(업데이트)
     */
    public void updateRefreshToken(Long userId, String refreshToken) {
        userRepo.findById(userId)
                .ifPresentOrElse(
                        user -> user.updateRefreshToken(refreshToken),
                        () -> new Exception("일치하는 회원이 없습니다.")
                );
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }
}
