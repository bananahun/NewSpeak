package com.ssafy.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GptFunctionCall {

    private static final String TYPE = "function";

    private String id;
    private String type;
    private GptFunctionResponse function;

    public static GptFunctionCall of(String id, GptFunctionResponse function) {
        return new GptFunctionCall(id, TYPE, function);
    }
}
