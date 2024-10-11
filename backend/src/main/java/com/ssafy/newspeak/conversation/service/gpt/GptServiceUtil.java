package com.ssafy.newspeak.conversation.service.gpt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.conversation.dto.gpt.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class GptServiceUtil {

    @Value("${gpt.api.url}")
    private String url;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GptResponse request(GptMessage system, GptQuestion question, GptAnswer answer, GptFunction function) {
        GptTool tool = GptTool.function(function);

        GptRequest request =  GptRequest.of(system, question, answer, tool);
        GptResponse response = Optional.ofNullable(restTemplate.postForObject(url, request, GptResponse.class))
                .orElseThrow(RuntimeException::new);
        response.getQuestion().press();

        return response;
    }
}
