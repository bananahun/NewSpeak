package com.ssafy.newspeak.pronounce.controller;

import com.ssafy.newspeak.pronounce.dto.ProRequest;
import com.ssafy.newspeak.pronounce.dto.ProResponse;
import com.ssafy.newspeak.pronounce.dto.PronounceClientRequest;
import com.ssafy.newspeak.pronounce.service.AudioFileUploadService;
import com.ssafy.newspeak.pronounce.service.ProService;
import io.github.bucket4j.Bucket;
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

    private final Bucket gcsBucket;

    @PostMapping
    public ResponseEntity<ProResponse> evaluatePronunciation(
            @RequestPart("audioFile") MultipartFile audioFile) throws IOException {
        if (gcsBucket.tryConsume(1)) {
            String audioFileUrl = audioFileUploadService.uploadFile(audioFile);
            ProRequest request = new ProRequest("english", audioFileUrl);
            ProResponse result = proService.evaluatePronunciation(request);
            return ResponseEntity.status(OK).body(result);
        } else {
            return ResponseEntity.status(TOO_MANY_REQUESTS)
                    .body(ProResponse.errorResponse(429, "잠시 후 시도해주세요"));
        }
    }
}