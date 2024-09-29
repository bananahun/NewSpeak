package com.ssafy.newspeak.conversation.dto.report;

import com.ssafy.newspeak.conversation.dto.assistant.RunThreadResponse;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReportCompleteRequest {

    private List<RunThreadResponse> conversations;
}
