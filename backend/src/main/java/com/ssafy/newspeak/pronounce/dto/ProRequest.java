package com.ssafy.newspeak.pronounce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProRequest {

    @NotBlank(message = "english")
    private String languageCode;

    @NotBlank(message = "{NotBlank}")
    private String soundFilePath;
}
