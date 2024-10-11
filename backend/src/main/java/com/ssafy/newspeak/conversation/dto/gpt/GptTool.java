package com.ssafy.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptTool {

    private static final String TYPE_FUNCTION = "function";

    private String type;
    private GptFunction function;

    public static GptTool function(GptFunction function) {
        return new GptTool(TYPE_FUNCTION, function);
    }
}
