package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class RunThreadResponse {
    private String user;
    private String assistant;
    private List<Map<Integer, String>> recommend;
    }
