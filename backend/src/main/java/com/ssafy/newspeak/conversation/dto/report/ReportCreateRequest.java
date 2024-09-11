package com.ssafy.newspeak.conversation.dto.report;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReportCreateRequest {

    @NotBlank
    private Long id;
}
