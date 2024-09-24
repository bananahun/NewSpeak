package com.ssafy.newspeak.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    UNAUTHORIZED("401"),
    ACCESS_DENIED("403");

    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }
}