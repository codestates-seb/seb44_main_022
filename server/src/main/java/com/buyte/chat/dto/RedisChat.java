package com.buyte.chat.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class RedisChat {

    private Long senderId;
    private Long receiverId;
    private Long roomId;
    private String message;

    public RedisChat(Long senderId, Long receiverId, Long roomId, String message) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.roomId = roomId;
        this.message = message;
    }
}
