package com.example.newspeak.pronounce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProRequest {

    @NotBlank(message = "{NotBlank}")
    private String sentence;

    @NotBlank(message = "{NotBlank}")
    private String soundFilePath;

}
