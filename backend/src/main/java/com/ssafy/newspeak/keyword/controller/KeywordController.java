package com.ssafy.newspeak.keyword.controller;

import com.ssafy.newspeak.keyword.dto.KeywordsFindResponse;
import com.ssafy.newspeak.keyword.service.KeywordService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/keywords")
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping
    public ResponseEntity<Result> findAll() {
        List<KeywordsFindResponse> keywordsFindResponse = keywordService.findAll();
        int count = keywordsFindResponse.size();
        Result<List<KeywordsFindResponse>> result = new Result<>(count, keywordsFindResponse);
        return ResponseEntity.status(OK).body(result);
    }

    @Getter
    @AllArgsConstructor
    static class Result<T> {
        private int count;
        private T data;
    }
}
