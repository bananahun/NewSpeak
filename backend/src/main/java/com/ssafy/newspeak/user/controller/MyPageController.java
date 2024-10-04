package com.ssafy.newspeak.user.controller;

import com.ssafy.newspeak.explog.repo.DailyExpDto;
import com.ssafy.newspeak.explog.service.ExpLogService;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.jwt.service.JwtService;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.controller.dto.CategoryListDto;
import com.ssafy.newspeak.user.controller.dto.DailyExpListDto;
import com.ssafy.newspeak.user.controller.dto.MyInfo;
import com.ssafy.newspeak.user.controller.dto.VocaListDto;
import com.ssafy.newspeak.user.entity.userCategory.UserCategoryId;
import com.ssafy.newspeak.user.repository.dto.ArticleInfoDto;
import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.user.service.UserArticleService;
import com.ssafy.newspeak.user.service.UserCategoryService;
import com.ssafy.newspeak.user.service.UserService;
import com.ssafy.newspeak.user.service.UserVocaService;
import com.ssafy.newspeak.user.repository.dto.CategoryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/my")
public class MyPageController {

    private final UserArticleService userArticleService;
    private final UserCategoryService userCategoryService;
    private final UserVocaService userVocaService;
    private final JwtService jwtService;
    private final ExpLogService expLogService;
    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<MyInfo> getMyInfo() {
        MyUserDetails userDetails=AuthUtil.getUserDetails();

        return ResponseEntity.ok(new MyInfo(userDetails));
    }

    @GetMapping("/articles/cookie")
    public ResponseEntity<Page<ArticleInfoDto>> getArticleByCookie(@CookieValue(value = "accessToken") String myCookie
            , Pageable pageable) {
        Long userId=jwtService.extractUserId(myCookie).orElseThrow();
        return ResponseEntity.ok().body(userArticleService.getAllUserArticles(userId,pageable));
    }

    @GetMapping("/articles")
    public ResponseEntity<Page<ArticleInfoDto>> getArticle(@RequestParam("page") int page, @RequestParam("size") int size) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        Pageable pageable=PageRequest.of(0,10);
        return ResponseEntity.ok().body(userArticleService.getAllUserArticles(userDetails.getUserId(),pageable));
    }

    @GetMapping("/vocas")
    public ResponseEntity<VocaListDto> getVocaAll() {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<VocaInfoDto> vocas=userVocaService.getVocaByUserId(userDetails.getUserId());
        return ResponseEntity.ok().body(new VocaListDto(vocas,vocas.size()));
    }

    @GetMapping("/categories")
    public ResponseEntity<CategoryListDto> getCategory(){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<CategoryDto> categories =userCategoryService.getAllCategoriesByUserId(userDetails.getUserId());

        return ResponseEntity.ok().body(new CategoryListDto(categories));
    }

    @PostMapping("/categories")
    public ResponseEntity<Void> postCategories(@RequestBody List<Long> categoryIds) {
//        if(categoryIds.size()>3){ return ResponseEntity.badRequest().build(); }
        //프론트가 검증

        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<UserCategoryId> userCategoryIds=new ArrayList<>();
        for(Long id:categoryIds){
            UserCategoryId userCategoryId=UserCategoryId.builder()
                    .categoryId(id)
                    .userId(userDetails.getUserId()).build();
            userCategoryIds.add(userCategoryId);
        }
        userCategoryService.updateCategoriesByUserId(userDetails.getUserId(),userCategoryIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exp-logs")
    public ResponseEntity<DailyExpListDto> getExpLogs(
            @RequestParam(defaultValue = "2024") int year
            , @RequestParam(defaultValue = "9") int month) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
//        YearMonth yearMonth = YearMonth.of(year, month);
        List<DailyExpDto> dailyExpListDtoList=expLogService.getDailyExpsByMonth(userDetails.getUserId());
        return ResponseEntity.ok().body(new DailyExpListDto(dailyExpListDtoList));
    }
}
