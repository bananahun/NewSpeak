package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class AssistantArticleRequest {
    private Long articleId;
}
