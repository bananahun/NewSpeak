package com.ssafy.newspeak.user.controller;

import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.security.util.UserAuthDto;
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

@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserArticleService userArticleService;
    private final UserVocaService userVocaService;
    private final JwtService jwtService;
    @GetMapping("/article")
    public ResponseEntity<Page<ArticleInfoDto>> getArticle(@CookieValue(value = "accessToken") String myCookie
            , Pageable pageable) {
        Long userId=jwtService.extractUserId(myCookie).orElseThrow();
        return ResponseEntity.ok().body(userArticleService.getAllUserArticles(userId,pageable));
    }

    @GetMapping("/voca")
    public ResponseEntity<VocaListDto> getVocaAll() {
        UserAuthDto userAuthDto=AuthUtil.getUserAuthDto();
        List<Voca> vocas=userVocaService.getVocaByUserId(userAuthDto.getUserId());
        return ResponseEntity.ok().body(new VocaListDto(vocas,vocas.size()));
    }

    @PostMapping("/voca")
    public ResponseEntity<VocaListDto> postVoca() {
        UserAuthDto userAuthDto=AuthUtil.getUserAuthDto();
        List<Voca> vocas=userVocaService.getVocaByUserId(userAuthDto.getUserId());
        return ResponseEntity.ok().body(new VocaListDto(vocas,vocas.size()));
    }


    @PostMapping("/category")
    public ResponseEntity<UserCategory> getCategory(){
        return ResponseEntity.ofNullable(null);
    }

}
