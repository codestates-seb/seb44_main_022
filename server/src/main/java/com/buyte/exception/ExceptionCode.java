package com.buyte.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    STORE_NOT_FOUND(404, "Store not found"),
    LOGOUT(401, "Logout"),
    NO_COOKIE(403, "No Cookie"),
    INVALID_REFRESH_TOKEN_STATE(403, "Invalid Refresh Token State"),
    INVALID_ACCESS_TOKEN_STATE(403, "Invalid Access Token State"),
    ACCESS_TOKEN_EXPIRED(401, "Access Token Expired");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
