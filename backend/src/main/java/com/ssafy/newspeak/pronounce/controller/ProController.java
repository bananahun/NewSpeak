package com.ssafy.newspeak.pronounce.controller;

import com.ssafy.newspeak.pronounce.dto.ProRequest;
import com.ssafy.newspeak.pronounce.dto.ProResponse;
import com.ssafy.newspeak.pronounce.service.AudioFileUploadService;
import com.ssafy.newspeak.pronounce.service.ProService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/v1/pronounce")
@RequiredArgsConstructor
public class ProController {

    private final AudioFileUploadService audioFileUploadService;

    private final ProService proService;

    @PostMapping
    public ResponseEntity<ProResponse> evaluatePronunciation(
            @RequestParam("file") MultipartFile audioFile) throws IOException {
            String audioFileUrl = audioFileUploadService.uploadFile(audioFile);
            ProRequest request = new ProRequest("english", audioFileUrl);
            ProResponse result = proService.evaluatePronunciation(request);
            return ResponseEntity.status(OK).body(result);
    }
}
