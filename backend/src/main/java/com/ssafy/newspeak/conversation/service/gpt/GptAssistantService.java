package com.ssafy.newspeak.conversation.service.gpt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.conversation.GptRole;
import com.ssafy.newspeak.conversation.dto.assistant.*;
import com.ssafy.newspeak.conversation.dto.gpt.GptMessage;
import com.ssafy.newspeak.conversation.exception.JsonException;
import com.ssafy.newspeak.conversation.exception.NotYetCompleteException;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class GptAssistantService {

    @Value("${gpt.api.threads}")
    private String DEFAULT_URL;

    @Value("${gpt.api.assistant.report}")
    private String ASSISTANT_REPORT;

    private final RestTemplate assistantTemplate;
    private final ObjectMapper objectMapper;

    public GptAssistantService(@Qualifier("assistant") RestTemplate assistantTemplate, ObjectMapper objectMapper) {
        this.assistantTemplate = assistantTemplate;
        this.objectMapper = objectMapper;
    }

    public String createThread(CreateThreadRequest request) {
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

    public String report(String threadId, String message) { return answer(threadId, message, ASSISTANT_REPORT); }

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

    public ThreadResult response(String threadId, String runId) throws JsonProcessingException {
        String checkURL = DEFAULT_URL + "/" + threadId + "/runs/" + runId;
        ThreadRunResponse checkRes = Optional.ofNullable(assistantTemplate.getForObject(checkURL, ThreadRunResponse.class))
                .orElseThrow(RuntimeException::new);

        if (!checkRes.getStatus().equals("completed")) {
            throw new NotYetCompleteException();
        }

        String messageURL = DEFAULT_URL + "/" + threadId + "/messages";
        ThreadMessageListResponse response = Optional.ofNullable(assistantTemplate.getForObject(messageURL, ThreadMessageListResponse.class))
                .orElseThrow(RuntimeException::new);

        try {
            return objectMapper.readValue(response.getLast(), ThreadResult.class);
        } catch (JsonProcessingException e) {
            throw new JsonException(e);
        }
    }
}
