package com.example.newspeak.pronounce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProRequest {

    @NotBlank(message = "english")
    private String languageCode;

    @NotBlank(message = "{NotBlank}")
    private String script;

    @NotBlank(message = "{NotBlank}")
    private String soundFilePath;

}
