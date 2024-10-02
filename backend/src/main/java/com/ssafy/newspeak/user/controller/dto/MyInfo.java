package com.ssafy.newspeak.user.controller.dto;

import com.ssafy.newspeak.security.jwt.MyUserDetails;
import lombok.Getter;

@Getter
public class MyInfo {
    private String email;
    private String nickname;
    private String imageUrl;

    public MyInfo(MyUserDetails myUserDetails){
        this.email = myUserDetails.getEmail();
        this.nickname = myUserDetails.getNickname();
        this.imageUrl=myUserDetails.getImageUrl();
    }
}
