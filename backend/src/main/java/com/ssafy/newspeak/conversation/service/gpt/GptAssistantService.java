package com.ssafy.newspeak.conversation.service.gpt;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.conversation.GptRole;
import com.ssafy.newspeak.conversation.dto.assistant.*;
import com.ssafy.newspeak.conversation.dto.gpt.GptMessage;
import com.ssafy.newspeak.conversation.dto.report.AfterReportCompleteResponse;
import com.ssafy.newspeak.conversation.dto.report.BeforeReportCompleteResponse;
import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.exception.JsonException;
import com.ssafy.newspeak.conversation.exception.NotYetCompleteException;
import com.ssafy.newspeak.conversation.service.ReportService;
import com.ssafy.newspeak.pronounce.service.AudioFileUploadService;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import io.github.bucket4j.Bucket;
import org.aspectj.lang.annotation.After;
import org.springframework.ai.openai.OpenAiAudioSpeechModel;
import org.springframework.ai.openai.OpenAiAudioSpeechOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.ai.openai.audio.speech.SpeechPrompt;
import org.springframework.ai.openai.audio.speech.SpeechResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;


import java.io.*;
import java.util.*;

@Service
public class GptAssistantService {

    @Value("${gpt.api.threads}")
    private String DEFAULT_URL;

    @Value("${gpt.api.assistant.report}")
    private String ASSISTANT_REPORT;

    @Value("${gpt.api.assistant.conv}")
    private String ASSISTANT_CONVERSATION;

    private final OpenAiAudioSpeechModel openAiAudioSpeechClient;
    private final ReportService reportService;

    private final RestTemplate assistantTemplate;
    private final ObjectMapper objectMapper;

    private final Bucket openAiBucket;

    public GptAssistantService(@Qualifier("assistant") RestTemplate assistantTemplate, ObjectMapper objectMapper, AudioFileUploadService audioFileUploadService, OpenAiAudioSpeechModel openAiAudioSpeechClient, ReportService reportService, Bucket openAiBucket) {
        this.assistantTemplate = assistantTemplate;
        this.objectMapper = objectMapper;
        this.openAiAudioSpeechClient = openAiAudioSpeechClient;
        this.reportService = reportService;
        this.openAiBucket = openAiBucket;
    }

    // 스레드를 만듭니다. (대화의 기초 시작)

    public String createConv(CreateThreadRequest request) {
        CreateThreadResponse response = assistantTemplate.postForObject(DEFAULT_URL, request, CreateThreadResponse.class);
        if (response == null) {
            throw new RuntimeException("Failed to create thread. Response is null.");
        }

        String threadId = response.getId();

        // ID가 null인 경우도 체크
        if (threadId == null) {
            throw new RuntimeException("Failed to create thread. Thread ID is null.");
        }

        return threadId;
    }

    public String createReport(CreateThreadRequest request) {
        CreateThreadResponse response = assistantTemplate.postForObject(DEFAULT_URL, request, CreateThreadResponse.class);
        if (response == null) {
            throw new RuntimeException("Failed to create thread. Response is null.");
        }
        String threadId = response.getId();
        if (threadId == null) {
            throw new RuntimeException("Failed to create thread. Thread ID is null.");
        }
        return threadId;
    }

    public String conversation(String threadId, String message) {
        return answer(threadId, message, ASSISTANT_CONVERSATION);
    }

    public String report(String threadId, List<RunThreadResponse> reportCompleteRequests) throws JsonProcessingException {
        System.out.println("reportCompleteRequests.toString() = " + reportCompleteRequests.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        String message = objectMapper.writeValueAsString(reportCompleteRequests);
        return answer(threadId, message, ASSISTANT_REPORT);
    }

    private String answer(String threadId, String message, String assistantId) {
        String messageURL = DEFAULT_URL + "/" + threadId + "/messages";
        GptMessage messageReq = GptMessage.of(GptRole.USER, message);
        assistantTemplate.postForObject(messageURL, messageReq, Object.class);

        String runURL = DEFAULT_URL + "/" + threadId + "/runs";
        RunThreadRequest runReq = RunThreadRequest.create(assistantId);
        ThreadRunResponse response = Optional.ofNullable(assistantTemplate.postForObject(runURL, runReq, ThreadRunResponse.class))
                .orElseThrow(() -> new RuntimeException("Failed to create thread. Run ID is null."));


        return response.getId();
    }

    public ThreadResult response(String threadId, String runId) throws JsonProcessingException , IOException {
        if (openAiBucket.tryConsume(1)) {
        String checkURL = DEFAULT_URL + "/" + threadId + "/runs/" + runId;
        ThreadRunResponse checkRes = Optional.ofNullable(assistantTemplate.getForObject(checkURL, ThreadRunResponse.class))
                .orElseThrow(RuntimeException::new);

        if (!checkRes.getStatus().equals("completed")) {
            throw new NotYetCompleteException();
        }

        String messageURL = DEFAULT_URL + "/" + threadId + "/messages";
        ThreadMessageListResponse response = Optional.ofNullable(assistantTemplate.getForObject(messageURL, ThreadMessageListResponse.class))
                .orElseThrow(RuntimeException::new);
        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        RunThreadResponse dialog = objectMapper.readValue(response.getLast(), RunThreadResponse.class);
        String result =  objectMapper.readValue(response.getLast(), RunThreadResponse.class).getAssistant();
        ResponseEntity<String> audioFile = responseAudio(result);
            System.out.println("openAiBucket.getAvailableTokens() = " + openAiBucket.getAvailableTokens());
        try {
            return ThreadResult.of(dialog, audioFile);
        } catch (Exception e) {
            throw new JsonException(e);
        }
        } else {
            return ThreadResult.error();
        }
    }


    public ResponseEntity<String> responseAudio(String result) throws IOException {

        OpenAiAudioSpeechOptions speechOptions = OpenAiAudioSpeechOptions.builder()
                .withModel("tts-1")
                .withVoice(OpenAiAudioApi.SpeechRequest.Voice.ALLOY)
                .withResponseFormat(OpenAiAudioApi.SpeechRequest.AudioResponseFormat.MP3)
                .withSpeed(1.0f)
                .build();

        SpeechPrompt speechPrompt = new SpeechPrompt(result, speechOptions);
        SpeechResponse response = openAiAudioSpeechClient.call(speechPrompt);
        byte[] audioDataBytes = response.getResult().getOutput();
        String base64EncodedAudio = Base64.getEncoder().encodeToString(audioDataBytes);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"output.mp3\"")
                .body(base64EncodedAudio);
    }

    public AfterReportCompleteResponse reportCompleteResponse(String threadId, String runId) throws JsonProcessingException {
        String checkURL = DEFAULT_URL + "/" + threadId + "/runs/" + runId;
        ThreadRunResponse checkRes = Optional.ofNullable(assistantTemplate.getForObject(checkURL, ThreadRunResponse.class))
                .orElseThrow(RuntimeException::new);

        if (!checkRes.getStatus().equals("completed")) {
            throw new NotYetCompleteException();
        }

        String messageURL = DEFAULT_URL + "/" + threadId + "/messages";
        ThreadMessageListResponse response = Optional.ofNullable(assistantTemplate.getForObject(messageURL, ThreadMessageListResponse.class))
                .orElseThrow(RuntimeException::new);
        System.out.println("response.getLast() = " + response.getLast());
        RunThreadReportResponse result =  objectMapper.readValue(response.getLast(), RunThreadReportResponse.class);
        result.setConversation(response.getConversation());
        // 저장하기
        MyUserDetails user = AuthUtil.getUserDetails();
        BeforeReportCompleteResponse beforeReportSave = BeforeReportCompleteResponse.of(result);
        try {
            reportService.create(beforeReportSave.getContent().getTitle(), beforeReportSave, user.getUserId());
            return AfterReportCompleteResponse.of(beforeReportSave.getContent(), true);
        } catch (Exception e) {
            return AfterReportCompleteResponse.of(beforeReportSave.getContent(), false);
        }
    }
}


