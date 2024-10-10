package com.ssafy.newspeak.user.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class FilterTestController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
