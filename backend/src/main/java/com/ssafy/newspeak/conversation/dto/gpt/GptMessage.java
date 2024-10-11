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
    private String content;

    public static GptMessage of(GptRole role, String content) {return new GptMessage(role.getCode(), content);}

    public static GptMessage system(String content) { return new GptMessage(GptRole.SYSTEM.getCode(), content);}

    public void updateContent(String content ) { this.content = content; }
}
