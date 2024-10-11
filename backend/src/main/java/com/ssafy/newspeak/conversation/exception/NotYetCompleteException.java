package com.ssafy.newspeak.conversation.exception;

public class NotYetCompleteException extends RuntimeException {

    public NotYetCompleteException() {
        super("Not yet complete");
    }
}