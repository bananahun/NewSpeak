package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RunThreadReportResponse {

    private String title;
    private String score;
    private Feedback feedback;
    private List<String> suggestions;
    private String conversation;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Feedback {
        private Vocabulary vocabulary;
        private Expressiveness expressiveness;
        private Comprehension comprehension;
        private Clarity clarity;
        private Grammar grammar;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Vocabulary {
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Expressiveness {
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Comprehension {
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Clarity {
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Grammar {
        private int score;
        private String feedback;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Conversation {
        private String user;
        private String assistant;
    }
}
