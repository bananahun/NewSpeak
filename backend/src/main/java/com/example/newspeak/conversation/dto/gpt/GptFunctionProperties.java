package com.example.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptFunctionProperties {

    private GptFunctionProperty question;
    private GptFunctionProperty c1;
    private GptFunctionProperty c2;
    private GptFunctionProperty c3;
    private GptFunctionProperty summarize;

    public static GptFunctionProperties of(String question, String c1, String c2, String c3, String summarize) {
        GptFunctionProperties props = new GptFunctionProperties();

        props.question = GptFunctionProperty.string(question);
        props.c1 = GptFunctionProperty.string(c1);
        props.c2 = GptFunctionProperty.string(c2);
        props.c3 = GptFunctionProperty.string(c3);
        props.summarize = GptFunctionProperty.string(summarize);

        return props;
    }
}
