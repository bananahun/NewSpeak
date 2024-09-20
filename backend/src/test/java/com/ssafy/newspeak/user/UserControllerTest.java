package com.ssafy.newspeak.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.user.entity.Role;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.user.repository.UserVocaRepo;
import com.ssafy.newspeak.user.service.UserArticleService;
import com.ssafy.newspeak.voca.VocaRepo;
import com.ssafy.newspeak.voca.controller.VocaPostDto;
import com.ssafy.newspeak.voca.entity.Voca;
import jakarta.persistence.EntityManager;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepo userRepo;

    @Autowired
    EntityManager em;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserVocaRepo userVocaRepo;

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

    @Autowired
    private UserArticleService userArticleService;

    @Autowired
    private VocaRepo vocaRepo;

    @Test
    @DisplayName("post 해서 get")
    public void testPostAndGet() throws Exception{

        // given
        Map<String, String> tokenMap = getTokenMap();
        String accessToken = tokenMap.get(ACCESS_TOKEN);
        MockCookie cookie = new MockCookie("accessToken", accessToken);

        // when, then
        mockMvc.perform(post("/api/v1/user/voca")
                        .cookie(cookie))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/v1/user/voca")
                        .cookie(cookie))
                .andExpect(status().isOk());
    }
}
