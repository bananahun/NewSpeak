package com.example.newspeak.sentence.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SentenceProRequest {

    @NotBlank(message = "{NotBlank}")
    private String sentence;

    @NotBlank(message = "{NotBlank}")
    private String soundFilePath;

}
