package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AssistantCreateResponse {
        private String id;
        private String name;
        private String model;
}
