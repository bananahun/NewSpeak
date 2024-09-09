package com.example.newspeak.pronounce.controller;

import com.example.newspeak.pronounce.dto.ProRequest;
import com.example.newspeak.pronounce.service.ProService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/sentences")
public class ProController {

    @Autowired
    private ProService proService;

    @PostMapping("/speak")
    public String evaluatePronunciation(@Valid @RequestBody ProRequest request) {
        try {
            return proService.evaluatePronunciation(request);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
