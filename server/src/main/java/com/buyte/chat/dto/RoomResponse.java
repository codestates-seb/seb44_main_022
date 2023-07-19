package com.buyte.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomResponse {

    private Long senderId;
    private Long receiverId;
    private Long roomId;

}
