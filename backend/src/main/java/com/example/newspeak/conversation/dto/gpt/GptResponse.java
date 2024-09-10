package com.example.newspeak.conversation.dto.gpt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GptResponse {

    private String id;
    private Long created;
    private String model;
    private List<Choice> choices;
    private Usage usage;

    // TODO: exception
    public String getResult() {
        return choices.stream()
                .map(e -> e.getMessage().getToolCalls().get(0).getFunction().getArguments())
                .findFirst()
                .orElseThrow(RuntimeException::new);
    }

    public GptQuestion getQuestion() {
        return choices.stream()
                .map(Choice::getMessage)
                .findFirst()
                .orElseThrow(RuntimeException::new);
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    static class Choice {

        private Integer index;
        private GptQuestion message;

        @JsonProperty("finish_reason")
        private String finishReason;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    static class Usage {

        @JsonProperty("prompt_tokens")
        private Integer promptTokens;

        @JsonProperty("completion_tokens")
        private Integer completionTokens;

        @JsonProperty("total_tokens")
        private Integer totalTokens;
    }
}
