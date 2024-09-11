package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadMessageContent {

    private String type;
    private ThreadMessageContentText text;

    public String text() {
        return text.value;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    private static class ThreadMessageContentText {

        private String value;
        private Object[] annotations;
    }
}
