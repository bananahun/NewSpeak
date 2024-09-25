package com.ssafy.newspeak.conversation.exception;

public class NoSuchReportException extends RuntimeException {

    public NoSuchReportException(Long reportId) {
        super("Report not found with" + reportId);
    }
}

