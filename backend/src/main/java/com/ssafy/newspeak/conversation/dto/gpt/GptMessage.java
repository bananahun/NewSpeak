package com.ssafy.newspeak.conversation.dto.gpt;

import com.ssafy.newspeak.conversation.GptRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptMessage {

    private String role;
    private String text;

    public static GptMessage of(GptRole role, String text) {return new GptMessage(role.getCode(), text);}

    public static GptMessage system(String text) { return new GptMessage(GptRole.SYSTEM.getCode(), text);}

    public void updateContent(String text) { this.text = text; }
}
