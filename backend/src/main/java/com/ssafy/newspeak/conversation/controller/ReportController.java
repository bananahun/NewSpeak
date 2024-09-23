package com.ssafy.newspeak.conversation.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.newspeak.article.service.ArticleService;
import com.ssafy.newspeak.conversation.dto.assistant.*;
import com.ssafy.newspeak.conversation.dto.report.ReportCreateResponse;
import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.exception.NoSuchReportException;
import com.ssafy.newspeak.conversation.service.ReportService;
import com.ssafy.newspeak.conversation.service.gpt.GptAssistantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/conversation")
public class ReportController {

    private final ReportService reportService;
    private final ArticleService articleService;
    private final GptAssistantService gptAssistantService;

    @PostMapping
    public ResponseEntity<ReportCreateResponse> createReport(@Valid
         @RequestParam("articleId") Long articleId) {
        String content = articleService.findById(articleId).getContent();
        ReportDto report = reportService.create(content);
        ReportCreateResponse response = ReportCreateResponse.of(report.getId(), report.getContent());
        return ResponseEntity.status(CREATED).body(response);
    }

    @PostMapping("/{reportId}")
    @ExceptionHandler(NoSuchReportException.class)
    public ResponseEntity<AssistantResponse> startThread(@PathVariable("reportId") Long reportId) {
        ReportDto report = reportService.getOne(reportId);
        String threadId = gptAssistantService.createThread(CreateThreadRequest.report(report.getContent()));
        AssistantResponse response = AssistantResponse.of(threadId);

        return ResponseEntity.status(OK).body(response);
    }

    @PostMapping("/{reportId}/{threadId}")
    public ResponseEntity<AssistantResponse> threadAnswer(
            @PathVariable("reportId") Long reportId,
            @PathVariable("threadId") String threadId,
            @Valid @RequestBody AssistantRequest body
            ) {
        String runId = gptAssistantService.report(threadId, body.getAnswer());
        AssistantResponse response = AssistantResponse.of(runId);

        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/{reportId}/{threadId}/{runId}")
    public ResponseEntity<ThreadResult> threadResponse(
            @PathVariable("reportId") Long reportId,
            @PathVariable("threadId") String threadId,
            @PathVariable("runId") String runId
    ) throws IOException {
        ThreadResult response = gptAssistantService.response(threadId, runId);
        return ResponseEntity.status(OK).body(response);
    }
}
