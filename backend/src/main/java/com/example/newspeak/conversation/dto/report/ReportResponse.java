package com.example.newspeak.conversation.dto.report;

import com.example.newspeak.conversation.entity.Report;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ReportResponse {

    private Long id;
    private String title;
    private String content;

    public static ReportResponse from(Report report) {
        ReportResponse reportResponse = new ReportResponse();
        reportResponse.id = report.getId();
        reportResponse.title = report.getTitle();
        reportResponse.content = report.getContent();
        return reportResponse;
    }
}
