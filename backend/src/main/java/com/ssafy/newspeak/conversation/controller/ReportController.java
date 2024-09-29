package com.ssafy.newspeak.conversation.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.newspeak.article.service.ArticleService;
import com.ssafy.newspeak.conversation.dto.assistant.*;
import com.ssafy.newspeak.conversation.dto.report.*;
import com.ssafy.newspeak.conversation.exception.NoSuchReportException;
import com.ssafy.newspeak.conversation.service.ReportService;
import com.ssafy.newspeak.conversation.service.gpt.GptAssistantService;
//import com.ssafy.newspeak.user.dto.UserAuthDto;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.After;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/conversation")
public class ReportController {

    private final ReportService reportService;
    private final ArticleService articleService;
    private final GptAssistantService gptAssistantService;


    // 생성된 보고서에 대한 api입니다.

//    @PostMapping
//    public ResponseEntity<ReportCreateResponse> createUserReport(@Valid @RequestBody ReportCompleteResponse body) throws JsonProcessingException {
//        MyUserDetails user = AuthUtil.getUserDetails();
//
//        ReportDto report = reportService.create(body.getContent().getTitle(), body, user.getUserId());
//        ReportCreateResponse response = ReportCreateResponse.of(report.getId(), report.getTitle(), report.getContent());
//
//        return ResponseEntity.status(CREATED).body(response);
//    }

    @GetMapping
    public ResponseEntity<ReportListResponse> getReportList() {
        MyUserDetails user = AuthUtil.getUserDetails();
        List<ReportDto> reports = reportService.getList(user.getUserId());
        ReportListResponse response = ReportListResponse.of(reports.size(), reports);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<ReportDto> getReport(@PathVariable Long reportId) {
        ReportDto report = reportService.getOne(reportId);
        return ResponseEntity.status(OK).body(report);
    }

    @DeleteMapping("/{reportId}")
    public Long deleteReport(@PathVariable Long reportId) {
        MyUserDetails user = AuthUtil.getUserDetails();
        reportService.deleteOne(reportId, user.getUserId());
        return reportId;
    }

    /*
    *
    * 대화와 보고서 open ai 관련 API 입니다.*/

    // 먼저 대화를 생성합니다.
    @PostMapping("/dialog")
    @ExceptionHandler(NoSuchReportException.class)
    public ResponseEntity<AssistantResponse> startThread(@Valid
                                                             @RequestBody AssistantArticleRequest body) {
        String threadId = gptAssistantService.createConv(CreateThreadRequest.dialog(articleService.findById(body.getArticleId()).getContent()));
        AssistantResponse response = AssistantResponse.of(threadId);

        return ResponseEntity.status(OK).body(response);
    }

    // 대화에 대한 질문을 먼저 던집니다.
    @PostMapping("/dialog/{threadId}")
    public ResponseEntity<AssistantResponse> threadAnswer(
            @PathVariable("threadId") String threadId,
            @Valid @RequestBody AssistantRequest body
            ) {
        String runId = gptAssistantService.conversation(threadId, body.getAnswer());
        AssistantResponse response = AssistantResponse.of(runId);

        return ResponseEntity.status(OK).body(response);
    }

    // 대화에 대한 응답을 받습니다.
    @GetMapping("/dialog/{threadId}/{runId}")
    public ResponseEntity<ThreadResult> threadResponse(
            @PathVariable("threadId") String threadId,
            @PathVariable("runId") String runId
    ) throws IOException {
        ThreadResult response = gptAssistantService.response(threadId, runId);
        return ResponseEntity.status(OK).body(response);
    }

    // 이제 대화를 기반으로 보고서 스레드를 생성합니다.
    @PostMapping("/report")
    public ResponseEntity<AssistantResponse> createReport() {
        String threadId = gptAssistantService.createReport(CreateThreadRequest.report());
        AssistantResponse response = AssistantResponse.of(threadId);

        return ResponseEntity.status(OK).body(response);
    }

    // 보고서에 사용될 회화 기록을 전달합니다.
    @PostMapping("/report/{threadId}")
//    @ExceptionHandler(NoSuchReportException.class)
    public ResponseEntity<AssistantResponse> reportAnswer(
            @PathVariable("threadId") String ThreadId,
            @Valid @RequestBody ReportCompleteRequest body
    ) throws JsonProcessingException {
        String runId = gptAssistantService.report(ThreadId, body.getConversations());
        AssistantResponse response = AssistantResponse.of(runId);

        return ResponseEntity.status(OK).body(response);
    }


    // 만들어진 대화에 대한 평가를 확인합니다.
    @GetMapping("report/{threadId}/{runId}")
    public ResponseEntity<AfterReportCompleteResponse> reportCompleteResponse(
            @PathVariable("threadId") String threadId,
            @PathVariable("runId") String runId
    ) throws IOException {
        AfterReportCompleteResponse response = gptAssistantService.reportCompleteResponse(threadId, runId);
        return ResponseEntity.status(OK).body(response);
    }
}
