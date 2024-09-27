package com.ssafy.newspeak.conversation.dto.report;

import com.ssafy.newspeak.conversation.entity.Report;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor(staticName = "of")
public class ReportListResponse {

    private final Integer count;
    private final List<ReportDto> reports;
}
