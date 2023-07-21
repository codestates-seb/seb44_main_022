package com.buyte.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatResDto {

    private Long chatId;
    private String content;
    private Long senderId;
    private Long receiverId;
    private LocalDateTime createdAt;
}
