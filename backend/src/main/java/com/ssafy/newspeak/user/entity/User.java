package com.ssafy.newspeak.user.entity;


import com.ssafy.newspeak.expLog.entity.ExpLog;
import com.ssafy.newspeak.tier.Tier;
import com.ssafy.newspeak.user.entity.userArticle.UserArticle;
import com.ssafy.newspeak.voca.entity.Voca;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "users")
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email; // 이메일
    private String password; // 비밀번호
    private String nickname; // 닉네임
    private String imageUrl; // 프로필 이미지

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, NAVER, GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    private Integer exp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tier_id")
    private Tier tier;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @BatchSize(size = 365)
    private List<ExpLog> expLogs=new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @BatchSize(size = 5)
    private List<Voca> vocas=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private Set<UserArticle> userArticles;

    private String refreshToken; // 리프레시 토큰


    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    //== 유저 필드 업데이트 ==//
    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
    }

    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}

