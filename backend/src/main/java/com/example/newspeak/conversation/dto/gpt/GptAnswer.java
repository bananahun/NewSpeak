package com.example.newspeak.conversation.dto.gpt;

import com.example.newspeak.conversation.GptRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptAnswer extends GptMessage{

    private static final String TOOL_CALL_ID = "chr";

    @JsonProperty("tool_call_id")
    private String toolCallId;

    private GptAnswer(String answer) {
        super(GptRole.TOOL.getCode(), answer);
        this.toolCallId = TOOL_CALL_ID;
    }

    public GptAnswer(String answer, String toolCallId) {
        super(GptRole.TOOL.getCode(), answer);
        this.toolCallId = toolCallId;
    }

    public static GptAnswer from(String answer) {return new GptAnswer(answer);}

    public static GptAnswer of(String answer, String toolCallId) {return new GptAnswer(answer, toolCallId);}
}
