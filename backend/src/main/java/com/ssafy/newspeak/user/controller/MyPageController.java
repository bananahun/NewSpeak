package com.ssafy.newspeak.user.controller;

import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.controller.dto.VocaListDto;
import com.ssafy.newspeak.user.entity.userCategory.UserCategory;
import com.ssafy.newspeak.user.repository.dto.ArticleInfoDto;
import com.ssafy.newspeak.user.service.UserArticleService;
import com.ssafy.newspeak.user.service.UserVocaService;
import com.ssafy.newspeak.voca.entity.Voca;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/my")
public class MyPageController {

    private final UserArticleService userArticleService;
    private final UserVocaService userVocaService;
    private final JwtService jwtService;

    @GetMapping("/test")
    public ResponseEntity<Object> getVocaList() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/articles/cookie")
    public ResponseEntity<Page<ArticleInfoDto>> getArticleByCookie(@CookieValue(value = "accessToken") String myCookie
            , Pageable pageable) {
        Long userId=jwtService.extractUserId(myCookie).orElseThrow();
        return ResponseEntity.ok().body(userArticleService.getAllUserArticles(userId,pageable));
    }

    @GetMapping("/articles")
    public ResponseEntity<Page<ArticleInfoDto>> getArticle(Pageable pageable) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        return ResponseEntity.ok().body(userArticleService.getAllUserArticles(userDetails.getUserId(),pageable));
    }

    @GetMapping("/vocas")
    public ResponseEntity<VocaListDto> getVocaAll() {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<Voca> vocas=userVocaService.getVocaByUserId(userDetails.getUserId());
        return ResponseEntity.ok().body(new VocaListDto(vocas,vocas.size()));
    }

    @PostMapping("/categories")
    public ResponseEntity<UserCategory> getCategory(){
        return ResponseEntity.ofNullable(null);
    }

}
