package com.ssafy.newspeak.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.user.entity.Role;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockCookie;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Slf4j
class JwtAuthenticationProcessingFilterTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepo userRepo;

    @Autowired
    EntityManager em;

    @Autowired
    JwtService jwtService;

    private ObjectMapper objectMapper = new ObjectMapper();

    PasswordEncoder delegatingPasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private static final String KEY_EMAIL = "email";
    private static final String KEY_PASSWORD = "password";
    private static final String EMAIL = "test1@naver.com";
    private static final String PASSWORD = "password1";
    private static final String LOGIN_URL = "/login";
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String BEARER = "Bearer ";

    private static final String ACCESS_TOKEN = "accessToken";
    private static final String REFRESH_TOKEN = "refreshToken";

    /**
     * 매 테스트 시작 전에 유저 데이터 생성
     */
    @BeforeEach
    public void init() {
        userRepo.save(User.builder().email(EMAIL).password(delegatingPasswordEncoder.encode(PASSWORD))
                .nickname("KSH1").role(Role.USER).build());
        clear();
    }

    private void clear() {
        em.flush();
        em.clear();
    }

    /**
     * Key : email, password인 usernamePasswordMap 반환
     */
    private Map<String, String> getUsernamePasswordMap(String email, String password) {
        Map<String, String> usernamePasswordMap = new LinkedHashMap<>();
        usernamePasswordMap.put(KEY_EMAIL, email);
        usernamePasswordMap.put(KEY_PASSWORD, password);
        return usernamePasswordMap;
    }

    /**
     * 로그인 요청을 보내서 액세스 토큰, 리프레시 토큰을 Map에 담아 반환
     */
    private Map<String, String> getTokenMap() throws Exception {
        Map<String, String> usernamePasswordMap = getUsernamePasswordMap(EMAIL, PASSWORD);

        // POST "/login", application/json, content로 이메일, 패스워드 Map 요청 결과 반환
        MvcResult result = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usernamePasswordMap)))
                .andReturn();

//        String accessToken = result.getResponse().getHeader(accessHeader);
//        String refreshToken = result.getResponse().getHeader(refreshHeader);

        String accessToken = result.getResponse().getCookie(ACCESS_TOKEN).getValue();
        String refreshToken = result.getResponse().getCookie(REFRESH_TOKEN).getValue();

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put(ACCESS_TOKEN, accessToken);
        tokenMap.put(REFRESH_TOKEN, refreshToken);
        return tokenMap;
    }

    @Test
    @DisplayName("AccessToken, RefreshToken 모두 존재하지 않는 경우 - /login로 302 리다이렉트")
    void Access_Refresh_not_exist() throws Exception {
        // when, then
        mockMvc.perform(get("/jwt-test")) // "/login"이 아니고, 존재하는 주소를 보내기
                .andExpect(status().isFound()); // 헤더에 아무 토큰도 없이 요청하므로 302
    }

    @Test
    @DisplayName("유효한 AccessToken만 요청 - 인증 성공 200")
    void Access_valid_request() throws Exception {
        // given
        Map<String, String> tokenMap = getTokenMap();
        String accessToken = tokenMap.get(ACCESS_TOKEN);
        MockCookie cookie = new MockCookie("accessToken", accessToken);

        // when, then
        mockMvc.perform(get("/api/v1/auth/jwt-test") // "/login"이 아니고, 존재하는 주소를 보내기
//                        .header(accessHeader, BEARER + accessToken)) // 유효한 AccessToken만 담아서 요청
                        .cookie(cookie))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("유효하지 않은 AccessToken만 요청 - /login로 302 리다이렉트)")
    void Access_not_valid_request() throws Exception {
        // given
        Map<String, String> tokenMap = getTokenMap();
        String accessToken = tokenMap.get(ACCESS_TOKEN);
        MockCookie cookie = new MockCookie("accessToken", accessToken+"1");
        // when, then
        mockMvc.perform(get("/jwt-test") // "/login"이 아니고, 존재하는 주소를 보내기
//                        .header(accessHeader, BEARER + accessToken + "1")) // 틀린 AccessToken만 담아서 요청
                        .cookie(cookie))
                .andExpect(status().isUnauthorized()); // 틀린 액세스 토큰이므로 401
    }

    @Test
    @DisplayName("AccessToken 만료된 경우, RefreshToken 유효한 경우 - AccessToken/RefreshToken 재발급 후 200")
    void Access_expired_and_Refresh_valid() throws Exception {
        // given
        Map<String, String> tokenMap = getTokenMap();
        String refreshToken = tokenMap.get(REFRESH_TOKEN);
        String accessToken = tokenMap.get(REFRESH_TOKEN);
        MockCookie cookie1 = new MockCookie("accessToken", accessToken);
        MockCookie cookie2 = new MockCookie("refreshToken", refreshToken);

        // when, then
        MvcResult result = mockMvc.perform(get("/api/v1/auth/jwt-test") // "/login"이 아니고, 존재하는 주소를 보내기
                            .cookie(cookie1,cookie2))
                            .andExpect(status().isOk())
                            .andReturn();
//        String accessToken = result.getResponse().getHeader(accessHeader); // accessToken 재발급
//        String reIssuedRefreshToken = result.getResponse().getHeader(refreshHeader); // refreshToken 재발급
        String reIssuedAccessToken = result.getResponse().getCookie(ACCESS_TOKEN).getValue();
        String reIssuedRefreshToken = result.getResponse().getCookie(REFRESH_TOKEN).getValue();


        String accessTokenSubject = JWT.require(Algorithm.HMAC512(secretKey)).build()
                .verify(reIssuedAccessToken).getSubject();
        String refreshTokenSubject = JWT.require(Algorithm.HMAC512(secretKey)).build()
                .verify(reIssuedRefreshToken).getSubject();

        assertThat(accessTokenSubject).isEqualTo(ACCESS_TOKEN_SUBJECT);//createToken
        assertThat(refreshTokenSubject).isEqualTo(REFRESH_TOKEN_SUBJECT);
    }

    @Test
    @DisplayName("AccessToken 만료된 경우, RefreshToken 유효하지 않은 경우 - /login로 302 리다이렉트")
    void Access_expired_and_Refresh_not_valid() throws Exception {
        // given
        Map<String, String> tokenMap = getTokenMap();
        String refreshToken = tokenMap.get(REFRESH_TOKEN);
        MockCookie cookie = new MockCookie("refreshToken", refreshToken+"1");

        // when, then
        mockMvc.perform(get("/jwt-test") // "/login"이 아니고, 존재하는 주소를 보내기
//                        .header(refreshHeader, BEARER + refreshToken + "1")) // 유효하지 않은 리프레시 토큰 보내기
                        .cookie(cookie))
                .andExpect(status().isFound());
    }

    @Test
    @DisplayName("POST /login으로 요청 보내면 JWT 필터 작동 X")
    void Login_URL_not_Run_jwt_Filter() throws Exception {
        // when, then
        mockMvc.perform(post("/login")) // "/login"이 아닌 임의의 주소를 보내기
                // JwtAuthenticationProcessingFilter에서 Post /login은 다음 필터로 넘겼으므로,
                // 다음 필터인 CustomJsonUsernamePasswordAuthenticationFilter로 넘어가서
                // 필터가 요구하는 JSON 형식이 아니어서 인증 실패 -> LoginFailureHandler로 넘어가서 400 반환
                .andExpect(status().isBadRequest());
    }

//    @Test
//    @DisplayName("최초 로그인(guest)이면 회원가입 페이지")
}