package com.ssafy.newspeak.conversation.dto.conversation;

import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.entity.Report;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ConversationDto {

    private final Long id;
    private final String content;

    public static ConversationDto from(Report report) {
        return ConversationDto.builder()
                .id(report.getId())
                .content(report.getContent())
                .build();
    }
}
