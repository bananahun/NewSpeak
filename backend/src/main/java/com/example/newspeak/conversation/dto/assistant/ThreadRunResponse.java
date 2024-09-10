package com.example.newspeak.conversation.dto.assistant;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadRunResponse {

    private String id;
    private String status;
}
