package com.ssafy.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadResult {

    private RunThreadResponse dialog;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ResponseEntity<String> audio;

    private int statusCode;

    private String message;

    public static ThreadResult of(RunThreadResponse dialog, ResponseEntity<String> audio) {
        return new ThreadResult(dialog, audio, 200, "response ok");
    }

    public static ThreadResult error() {
        return new ThreadResult(null, null, 500, "response error");
    }
}
