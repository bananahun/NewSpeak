package com.example.newspeak.conversation.dto.assistant;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AssistantRequest {

    @NotBlank
    String answer;
}
