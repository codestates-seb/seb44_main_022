package com.buyte.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Builder
public class RoomResponse implements Serializable {

    private static final Long serialVersionUID = 6494678977089006639L;

    private Long senderId;
    private Long receiverId;
    private Long roomId;

}
