package com.buyte.chat.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RoomRequest {

    @NotNull
    private final Long storeId;

    public RoomRequest(Long storeId) {
        this.storeId = storeId;
    }
}
