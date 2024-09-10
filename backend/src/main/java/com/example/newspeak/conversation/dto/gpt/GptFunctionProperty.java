package com.example.newspeak.conversation.dto.gpt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptFunctionProperty {

    private String type;
    private String description;

    public static GptFunctionProperty string(String description) {
        return new GptFunctionProperty("string", description);
    }
}
