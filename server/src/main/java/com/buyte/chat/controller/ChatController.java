package com.buyte.chat.controller;

import com.buyte.chat.dto.ChatReqDto;
import com.buyte.chat.dto.ChatResDto;
import com.buyte.chat.dto.RoomRequest;
import com.buyte.chat.dto.RoomResponse;
import com.buyte.chat.service.ChatService;
import com.buyte.chat.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    private final RoomService roomService;

    @MessageMapping("/chats/{roomId}")
    public void chat(@DestinationVariable Long roomId, ChatReqDto message) {

        simpMessagingTemplate.convertAndSend("/sub/" + roomId, message);
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

        List<RoomResponse> allRoom = roomService.findAllRoom();

        return ResponseEntity.ok(allRoom);
    }
}
