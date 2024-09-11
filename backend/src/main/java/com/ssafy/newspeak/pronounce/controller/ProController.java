package com.ssafy.newspeak.pronounce.controller;

import com.ssafy.newspeak.pronounce.dto.ProRequest;
import com.ssafy.newspeak.pronounce.service.AudioFileUploadService;
import com.ssafy.newspeak.pronounce.service.ProService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/pronounce")
@RequiredArgsConstructor
public class ProController {

    private final AudioFileUploadService audioFileUploadService;

    private final ProService proService;

    @PostMapping
    public String evaluatePronunciation(
            @RequestParam("file") MultipartFile audioFile,
            @RequestParam("script") String script) {
        try {

            String audioFileUrl = audioFileUploadService.uploadFile(audioFile);

            ProRequest request = new ProRequest("english", script, audioFileUrl);

            return proService.evaluatePronunciation(request);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
