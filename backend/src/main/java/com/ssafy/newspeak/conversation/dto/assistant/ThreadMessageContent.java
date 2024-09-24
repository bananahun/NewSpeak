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
        return text != null ? text.value : null; // text가 null일 경우 처리
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    private static class ThreadMessageContentText {

        private String value;
        private Object[] annotations;
    }
}
