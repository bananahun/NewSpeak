package com.ssafy.newspeak.word.controller;

import com.ssafy.newspeak.word.dto.WordMeaningFindResponse;
import com.ssafy.newspeak.word.service.WordService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/words")
public class WordController {

    private final WordService wordService;

    @GetMapping("/{word}/meaning")
    public ResponseEntity<WordMeaningFindResponse> findMeaning(@PathVariable String word) {
        WordMeaningFindResponse result = wordService.findMeaningByContent(word);
        return ResponseEntity.status(OK).body(result);
    }

    @Getter
    @AllArgsConstructor
    static class Result<T> {

        private int count;
        private T data;
    }
}
