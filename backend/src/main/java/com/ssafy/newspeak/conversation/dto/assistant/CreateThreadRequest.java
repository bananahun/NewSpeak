package com.ssafy.newspeak.conversation.dto.assistant;

import com.ssafy.newspeak.conversation.GptRole;
import com.ssafy.newspeak.conversation.dto.gpt.GptMessage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateThreadRequest {

    private List<GptMessage> messages;

    public static CreateThreadRequest create() {
        List<GptMessage> messageList = new ArrayList<>();

        messageList.add(GptMessage.of(GptRole.USER, ""));

        return new CreateThreadRequest(messageList);
    }

    public static CreateThreadRequest report(String content) {
        return new CreateThreadRequest(List.of(GptMessage.of(GptRole.USER, "보고서에 사용된 기사 내용은 " + content)));
    }
}
