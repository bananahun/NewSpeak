package com.example.newspeak.conversation.dto.gpt;

import com.example.newspeak.conversation.GptRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptQuestion extends GptMessage{

    private static final String NAME = "choice";
    private static final String TOOL_CALL_ID = "chr";

    @JsonProperty("tool_calls")
    private List<GptFunctionCall> toolCalls;

    private GptQuestion(GptFunctionCall toolCalls) {
        super(GptRole.ASSISTANT.getCode(), null);
        this.toolCalls = List.of(toolCalls);
    }

    public static GptQuestion from(String arguments) {
        GptFunctionResponse response = GptFunctionResponse.of(NAME, arguments);
        return new GptQuestion(GptFunctionCall.of(TOOL_CALL_ID, response));
    }

    public String toolCallId() {
        return toolCalls.stream()
                .map(GptFunctionCall::getId)
                .findFirst()
                .orElseThrow(RuntimeException::new);
    }

    public void press() {
        if (toolCalls.isEmpty()) {
            return;
        }
        GptFunctionCall first = toolCalls.get(0);
        toolCalls.clear();
        toolCalls.add(first);
    }

}
