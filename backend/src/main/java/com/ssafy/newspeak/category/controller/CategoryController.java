package com.ssafy.newspeak.category.controller;

import com.ssafy.newspeak.category.dto.CategoryFindResponse;
import com.ssafy.newspeak.category.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Result> findAll() {
        List<CategoryFindResponse> categoriesFindResponse = categoryService.findAll();
        int count = categoriesFindResponse.size();
        Result<List<CategoryFindResponse>> result = new Result<>(count, categoriesFindResponse);
        return ResponseEntity.status(OK).body(result);
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class Result<T> {

        private Integer count;
        private T categories;

    }
}
