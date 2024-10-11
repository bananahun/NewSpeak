package com.ssafy.newspeak.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GptConfig {

    @Value("${gpt.api-key}")
    private String secretKey;

    @Bean
    @Primary
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getInterceptors().add((req, body, exec) -> {
            req.getHeaders().add("Authorization", "Bearer " + secretKey);
            return exec.execute(req, body);
        });
        return restTemplate;
    }

    @Bean
    public HttpHeaders httpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Bean
    @Qualifier("assistant")
    public RestTemplate assistantTemplate() {
        RestTemplate assistantTemplate = new RestTemplate();

        assistantTemplate.getInterceptors().add((req, body, exec) -> {
            req.getHeaders().add("Authorization", "Bearer " + secretKey);
            req.getHeaders().add("Content-Type", "application/json");
            req.getHeaders().add("OpenAI-Beta", "assistants=v2");
            return exec.execute(req, body);
        });
        System.out.println("assistantTemplate = " + assistantTemplate);
        return assistantTemplate;
    }
}