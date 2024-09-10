package com.example.newspeak.conversation.service.gpt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GptAssistantService {

    @Value("${gpt.api.threads}")
    private String DEFAULT_URL;


}
