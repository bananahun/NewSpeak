package com.example.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.rmi.UnexpectedException;
import java.util.List;

@Getter
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadMessageListResponse {

    private String object;
    private String firstId;
    private String lastId;
    private boolean hasMore;
    private List<ThreadMessage> data;

    public String getLast() {
        if (data == null || data.isEmpty()) {
            return null;
        }
        if (data.get(0).getContent() == null || data.get(0).getContent().length == 0) {
            return null;
        }
        return data.get(0).getContent()[0].text();
    }
}
