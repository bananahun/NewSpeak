package com.ssafy.newspeak.conversation.dto.report;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(staticName = "of")
public class ReportCreateResponse {

    private final Long id;
    private final String content;
}