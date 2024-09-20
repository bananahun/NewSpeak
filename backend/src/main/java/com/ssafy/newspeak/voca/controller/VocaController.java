package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.voca.VocaRepo;
import com.ssafy.newspeak.voca.entity.Voca;
import com.ssafy.newspeak.voca.service.VocaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vocas")
public class VocaController {
    private final VocaService vocaService;
    @PostMapping("")
    public void makeVoca(@RequestBody VocaPostDto vocaPostDto) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        vocaService.makeVoca(vocaPostDto,userDetails.getUserId());
    }
}
