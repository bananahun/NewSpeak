//package com.ssafy.newspeak.security.util;
//
//import com.ssafy.newspeak.security.jwt.service.JwtService;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//
//import java.util.Optional;
//
//@RequiredArgsConstructor
//public class ExtractUtil {
//    private final JwtService jwtService;
//
//    public Optional<String> extractTokenFromCookies(HttpServletRequest request, String tokenName) {
//        if (request.getCookies() != null) {
//            for (Cookie cookie : request.getCookies()) {
//                if (tokenName.equals(cookie.getName())) {
//                    return Optional.ofNullable(cookie.getValue());
//                }
//            }
//        }
//        return Optional.empty();
//    }
//
//    public static String extractEmailFromRequest(HttpServletRequest request) {
//        if (request.getCookies() != null) {
//            for (Cookie cookie : request.getCookies()) {
//                if ("accessToken".equals(cookie.getName())) {
//                    return Optional.ofNullable(cookie.getValue());
//                }
//            }
//        }
//        return Optional.empty();
//    }
//
//    private String extractEmailFromToken(String accessToken){
//        jwtService.extractEmail()
//    }
//
//}
