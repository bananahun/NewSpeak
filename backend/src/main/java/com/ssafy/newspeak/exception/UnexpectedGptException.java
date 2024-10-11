package com.ssafy.newspeak.exception;

public class UnexpectedGptException extends RuntimeException {

    public UnexpectedGptException() {
        super("Unexpected GPT Exception");
    }
}
