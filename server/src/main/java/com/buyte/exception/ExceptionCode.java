package com.buyte.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    STORE_NOT_FOUND(404, "Store not found"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    PRODUCT_TYPE_CUSTOM_FORBIDDEN(403, "Access to product details for custom products is forbidden"),
    PRODUCT_TYPE_STANDARD_FORBIDDEN(403, "Access to product details for standard products is forbidden"),
    LOGOUT(401, "Logout"),
    NO_COOKIE(403, "No Cookie"),
    INVALID_REFRESH_TOKEN_STATE(403, "Invalid Refresh Token State"),
    INVALID_ACCESS_TOKEN_STATE(403, "Invalid Access Token State"),
    ACCESS_TOKEN_EXPIRED(401, "Access Token Expired"),
    REFRESH_TOKEN_EXPIRED(401, "Refresh Token Expired"),
    CART_NOT_FOUND(404, "Cart not found"),
    CHATROOM_NOT_FOUND(404,"Chatroom not found"),
    SAME_ID_CHAT_ROOM(401,"Customer ID and Seller ID are the same");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
