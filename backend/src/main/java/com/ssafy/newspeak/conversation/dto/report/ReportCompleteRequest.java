package com.ssafy.newspeak.conversation.dto.report;

import com.ssafy.newspeak.conversation.dto.assistant.RunThreadResponse;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReportCompleteRequest {

    private List<RunThreadResponse> conversations;
}
