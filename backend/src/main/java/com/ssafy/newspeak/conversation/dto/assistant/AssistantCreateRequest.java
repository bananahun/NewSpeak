package com.ssafy.newspeak.conversation.dto.assistant;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class AssistantCreateRequest {
    private String name;
    private String instructions;
    private String model;
}