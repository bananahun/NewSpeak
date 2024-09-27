package com.ssafy.newspeak.conversation.dto.report;

import com.ssafy.newspeak.conversation.entity.Report;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ReportDto {

    private final Long id;
    private final String content;

    public static ReportDto from(Report report) {
        return ReportDto.builder()
                .id(report.getId())
                .content(report.getContent())
                .build();
    }
}
