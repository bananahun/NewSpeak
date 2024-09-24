package com.ssafy.newspeak.sentence.controller;

import com.ssafy.newspeak.sentence.dto.SentenceKoreanResponse;
import com.ssafy.newspeak.sentence.service.SentenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sentences")
public class SentenceController {

    private final SentenceService sentenceService;

    @GetMapping("/{sentence_id}")
    public ResponseEntity<SentenceKoreanResponse> findById(@PathVariable("sentence_id") long sentence_id) {
        SentenceKoreanResponse result = sentenceService.findById(sentence_id);
        return ResponseEntity.status(OK).body(result);
    }
}
