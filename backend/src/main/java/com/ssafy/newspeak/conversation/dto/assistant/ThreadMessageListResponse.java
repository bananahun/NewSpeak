package com.ssafy.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.newspeak.exception.UnexpectedGptException;
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
            throw new UnexpectedGptException();
        }
        if (data.get(0).getContent() == null || data.get(0).getContent().length == 0) {
            throw new UnexpectedGptException();
        }

        return data.get(0).getContent()[0].text();
    }
}
