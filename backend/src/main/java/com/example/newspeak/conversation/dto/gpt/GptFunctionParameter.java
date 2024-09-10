package com.example.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptFunctionParameter {

    private static final String TYPE = "object";
    private static final List<String> REQUIRED = List.of("question", "c1", "c2", "c3", "summarize");

    private String type;
    private List<String> required;
    private GptFunctionProperties properties;

    public static GptFunctionParameter of(String question, String c1, String c2, String c3, String summarize) {
        GptFunctionProperties props = GptFunctionProperties.of(question, c1, c2, c3, summarize);
        return new GptFunctionParameter(TYPE, REQUIRED, props);
    }

}

