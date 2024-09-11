package com.ssafy.newspeak.conversation.controller;

import com.ssafy.newspeak.article.service.ArticleService;
import com.ssafy.newspeak.conversation.dto.report.ReportCreateRequest;
import com.ssafy.newspeak.conversation.dto.report.ReportCreateResponse;
import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/conversation")
public class ConvController {

    private final ReportService reportService;
    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<ReportCreateRequest> createReport(@Valid @RequestBody ReportCreateRequest body) {
        String content = articleService.findById(body.getId()).getContent();
//        ReportDto report = reportService.create()
//        ReportCreateResponse response = ReportCreateResponse;
        return null;
    }

}
