package com.ssafy.newspeak.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    // ============ 공원영 ================ //
    EMAIL_ALREADY_EXIST("A001"),
    INVALID_PARAMETER("A002"),
    USER_NOT_FOUND("A003"),
    PARAGRAPH_NOT_FOUND("A007"),
    REACTION_NOT_FOUND("A008"),
    PARAGRAPH_REACTION_NOT_FOUND("A010"),
    PARAGRAPH_REACTION_ALREADY_EXIST("A009"),
    EMAIL_NOT_VERIFIED("A004"),
    EMAIL_VERIFICATION_EXPIRED("A005"),
    OLDPASSWORD_NOT_MATCHED("A005"),
    NEWPASSWORD_NOT_MATCHED("A006"),
    UNAUTHORIZED("A007"),
    // =========== 박영훈 ========== //
    ALREADY_EXISTS("ALREADY_EXISTS"),
    LIMIT_OVER("LIMIT_OVER"),
    NOT_FOUND("NOT_FOUND"),
    INVALID_PRINCIPAL("INVALID_PRINCIPAL"),
    INVALID_ACTION("INVALID_ACTION");
    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }
}