package com.ssafy.newspeak.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;

import java.util.List;

@Getter
public class ErrorResponse {

    private final String errorCode;
    private final String message;
    private List<FieldError> fieldErrors;

    public ErrorResponse(ErrorCode errorCode, String message) {
        this.errorCode = errorCode.getCode();
        this.message = message;
    }

    public void addFieldErrors(BindingResult bindingResult) {
        fieldErrors = bindingResult.getFieldErrors()
                .stream()
                .map(error -> new ErrorResponse.FieldError(
                        error.getField(),
                        error.getDefaultMessage()))
                .toList();
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError {

        private final String field;
        private final String message;
    }
}