package com.example.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptRequest {

    private static final String DEFAULT_MODEL = "gpt-4o-mini";
    private static final String DEFAULT_TOOL_CHOICE = "required";
    private static final Double DEFAULT_TEMPERATURE = 2.0;
    private static final Double DEFAULT_TOP_P = 0.6;
    private static final Integer DEFAULT_FREQUENCY_PENALTY = 0;
    private static final Integer DEFAULT_PRESENCE_PENALTY = 0;
    private static final Integer DEFAULT_MAX_TOKENS = 16383;

    private final List<GptMessage> messages = new ArrayList<>();
    private final List<GptTool> tools = new ArrayList<>();
    private final String model = DEFAULT_MODEL;
    private final String tool_choice = DEFAULT_TOOL_CHOICE;
    private final Double temperature = DEFAULT_TEMPERATURE;
    private final Double top_p = DEFAULT_TOP_P;
    private final Integer frequency_penalty = DEFAULT_FREQUENCY_PENALTY;
    private final Integer presence_penalty = DEFAULT_PRESENCE_PENALTY;
    private final Integer max_tokens = DEFAULT_MAX_TOKENS;

    public static GptRequest of(GptMessage system, GptQuestion question, GptAnswer answer, GptTool tool) {
        GptRequest request = new GptRequest();
        request.messages.addAll(List.of(system, question, answer));
        request.tools.add(tool);
        return request;
    }
}
