package com.ssafy.newspeak.conversation.dto.report;

import com.ssafy.newspeak.conversation.dto.assistant.RunThreadReportResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BeforeReportCompleteResponse {

    private RunThreadReportResponse content;
}
