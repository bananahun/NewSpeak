package com.example.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptFunction {

    private static final String NAME = "choice";
    private static final String DESCRIPTION = "캐릭터 특성 선택지 제공을 위한 함수";

    private static final String QUESTION = "The next question you'll ask";
    private static final String C1 = "First option";
    private static final String C2 = "Second option";
    private static final String C3 = "Third option";

    private String name;
    private String description;
    private GptFunctionParameter parameters;

    // TODO: yml로 옮기기
    public static GptFunction character() {
        final String SUMMARIZE = "지금까지의 선택지를 종합하여 만든 줄글 형태의 캐릭터 설명글";

        GptFunctionParameter params = GptFunctionParameter.of(QUESTION, C1, C2, C3, SUMMARIZE);
        return new GptFunction(NAME, DESCRIPTION, params);
    }

    public static GptFunction background() {
        final String SUMMARIZE = "지금까지의 선택지를 종합하여 만든 줄글 형태의 세계관 설명글";

        GptFunctionParameter params = GptFunctionParameter.of(QUESTION, C1, C2, C3, SUMMARIZE);
        return new GptFunction(NAME, DESCRIPTION, params);
    }

    public static GptFunction fiction() {
        final String SUMMARIZE = "지금까지의 선택지를 종합하여 만든 줄글 형태의 소설";

        GptFunctionParameter params = GptFunctionParameter.of(QUESTION, C1, C2, C3, SUMMARIZE);
        return new GptFunction(NAME, DESCRIPTION, params);
    }
}
