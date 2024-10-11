package com.ssafy.newspeak.user.controller;

import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.controller.dto.UserSignUpDto;
import com.ssafy.newspeak.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    /**
     * oAuth 최초 로그인 시 회원가입 api
     * @param userSignUpDto
     * @return httpStatus
     * @throws Exception
     */
    @PostMapping("/signUp")
    public ResponseEntity<String> OAuthSignUp(HttpServletRequest request, @RequestBody UserSignUpDto userSignUpDto) throws Exception {
        Cookie[] cookies=request.getCookies();
//        CustomOAuth2User oAuth2User = AuthUtil.getCustomOAuth2User();
        authService.OAuthSignUp(request,userSignUpDto);
        return ResponseEntity.status(HttpStatus.OK).body("Sign up successful");
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        String email= AuthUtil.getUserDetails().getEmail();
        return "jwtTest 요청 성공 "+email;
    }

    @GetMapping("/email")
    public ResponseEntity<String> getEmail(HttpServletRequest request) {
        String token = jwtService.extractAccessToken(request.getCookies()).orElseThrow(NoSuchElementException::new);
        if (token != null && jwtService.isTokenValid(token)) {
            String email = jwtService.extractEmail(token).orElseThrow(NoSuchElementException::new);
            return ResponseEntity.ok(email);
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        jwtService.setAccessTokenExpired(response);
        jwtService.setRefreshTokenExpired(response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}