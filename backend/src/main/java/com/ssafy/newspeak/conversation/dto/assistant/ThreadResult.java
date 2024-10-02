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
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThreadResult {

    private RunThreadResponse dialog;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ResponseEntity<String> audio;
}
