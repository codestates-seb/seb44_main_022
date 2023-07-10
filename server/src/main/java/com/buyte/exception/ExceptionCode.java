package com.buyte.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    STORE_NOT_FOUND(404, "Store not found"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    PRODUCT_TYPE_CUSTOM_FORBIDDEN(403, "Access to product details for custom products is forbidden");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
