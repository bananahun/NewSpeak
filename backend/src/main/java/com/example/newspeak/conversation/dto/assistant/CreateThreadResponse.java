package com.example.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CreateThreadResponse {

    private String id;
    private String object;
    private String metadata;

    @JsonProperty("created_at")
    private Long createdAt;

    @JsonProperty("tool_resources")
    private Object toolResources;
}
