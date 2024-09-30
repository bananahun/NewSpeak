package com.ssafy.newspeak.user.service;


import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.user.controller.dto.UserSignUpDto;
import com.ssafy.newspeak.user.entity.Role;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.voca.controller.VocaPostDto;
import com.ssafy.newspeak.voca.service.VocaService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;


@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final VocaService vocaService;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepo.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepo.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepo.save(user);
    }

    private final String VocaDefaultName="나의 단어장";
    public void OAuthSignUp(HttpServletRequest request,UserSignUpDto userSignUpDto) throws Exception {
        Cookie[] cookies=request.getCookies();
        String accessToken=jwtService.extractAccessToken(cookies).orElse(null);
        Long userId=jwtService.extractUserId(accessToken).orElseThrow(IllegalArgumentException::new);
        userRepo.findByNickname(userSignUpDto.getNickname()).ifPresent(user -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nickname already exists");
        });
        //oAuth 로그인으로 저장한 email은 임시 키
        User user= userRepo.findById(userId).orElseThrow(NoSuchElementException::new);
        if(user.getRole().equals(Role.USER)) {
            throw new IllegalAccessException();
        }
        user.updateNickname(userSignUpDto.getNickname());
        user.authorizeUser();
        
        vocaService.makeVoca(new VocaPostDto(VocaDefaultName),user);

        userRepo.save(user);
    }
}


