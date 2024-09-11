package com.ssafy.newspeak.user.service;


import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.user.controller.dto.UserSignUpDto;
import com.ssafy.newspeak.user.entity.Role;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    public void OAuthSignUp(HttpServletRequest request,UserSignUpDto userSignUpDto) throws Exception {
        Cookie[] cookies=request.getCookies();
        String accessToken=jwtService.extractAccessToken(cookies).orElse(null);
        String email=jwtService.extractEmail(accessToken).orElseThrow(IllegalArgumentException::new);
        //oAuth 로그인으로 저장한 email은 임시 키
        User user=userRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        if(user.getRole().equals(Role.USER)) {
            throw new IllegalAccessException();
        }
        user.updateNickname(userSignUpDto.getNickname());
        user.authorizeUser();

        userRepository.save(user);
    }
}


