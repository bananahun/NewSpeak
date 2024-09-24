package com.ssafy.newspeak.conversation.dto.conversation;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(staticName = "of")
public class ConvCreateResponse {

    private final Long id;
    private final String content;
}
