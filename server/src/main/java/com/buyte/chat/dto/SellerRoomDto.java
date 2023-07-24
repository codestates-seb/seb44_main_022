package com.buyte.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SellerRoomDto {

    private Long senderId;
    private Long receiverId;
    private Long roomId;
    private String customerName;
    private String storeName;
}
