package com.ssafy.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadMessage {

    private String id;
    private String object;
    private Long createdAt;
    private String assistantId;
    private String threadId;
    private String runId;
    private String role;
    private Object attachments;
    private Object metadata;
    private ThreadMessageContent[] content;
}
