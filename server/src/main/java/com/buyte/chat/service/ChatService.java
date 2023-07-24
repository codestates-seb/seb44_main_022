package com.buyte.chat.service;


import com.buyte.chat.dto.ChatReqDto;
import com.buyte.chat.dto.ChatResDto;
import com.buyte.chat.entity.ChatRoom;
import com.buyte.chat.entity.Message;
import com.buyte.chat.repository.ChatRoomRepository;
import com.buyte.chat.repository.MessageRepository;
import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;


    @Transactional
    public void save(Long roomId, ChatReqDto message) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
        Member sender = memberRepository.findById(message.getSenderId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member receiver = memberRepository.findById(message.getReceiverId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Message chatMessage = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(message.getContent())
                .room(room)
                .build();

        messageRepository.save(chatMessage);
    }

    public List<ChatResDto> findAllChat(Long roomId) {
        List<Message> allChat = messageRepository.findByRoomRoomId(roomId);
        List<ChatResDto> allChatDto = new ArrayList<>();
        ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");

        for (Message message : allChat) {
            ZonedDateTime seoulCreatedAt = message.getCreatedAt()
                    .atZone(ZoneId.systemDefault())
                    .withZoneSameInstant(seoulZoneId);

            ChatResDto chatResDto = ChatResDto.builder()
                    .chatId(message.getChatId())
                    .content(message.getContent())
                    .senderId(message.getSender().getMemberId())
                    .receiverId(message.getReceiver().getMemberId())
                    .createdAt(seoulCreatedAt.toLocalDateTime())
                    .build();
            allChatDto.add(chatResDto);
        }

        return allChatDto;
    }
}
