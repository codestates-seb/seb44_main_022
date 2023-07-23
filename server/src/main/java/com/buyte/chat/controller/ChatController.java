package com.buyte.chat.controller;

import com.buyte.chat.dto.*;
import com.buyte.chat.service.ChatService;
import com.buyte.chat.service.RedisPublisher;
import com.buyte.chat.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;
    private final RoomService roomService;

    @MessageMapping("/chats/{roomId}")
    public void chat(@DestinationVariable Long roomId, ChatReqDto message) {

        redisPublisher.publish(ChannelTopic.of("room"+roomId), new RedisChat(message.getSenderId()
                , message.getReceiverId(), roomId, message.getContent()));
        chatService.save(roomId,message);
    }

    @GetMapping("/room")
    public ResponseEntity<RoomResponse> createRoom(@ModelAttribute @Valid RoomRequest roomRequest) {

        return ResponseEntity.ok(roomService.findOrCreate(roomRequest));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity findChats(@PathVariable @Positive Long roomId) {

        List<ChatResDto> allChat = chatService.findAllChat(roomId);

        return ResponseEntity.ok(allChat);
    }

    @GetMapping("/room/seller")
    public ResponseEntity findChatRoom() {

        List<SellerRoomDto> allRoom = roomService.findAllRoom();

        return ResponseEntity.ok(allRoom);
    }
}
