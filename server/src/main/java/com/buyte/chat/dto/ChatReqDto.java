package com.buyte.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ChatReqDto {

    @NotNull
    private Long senderId;
    @NotNull
    private Long receiverId;
    @NotBlank
    private String content;
}
