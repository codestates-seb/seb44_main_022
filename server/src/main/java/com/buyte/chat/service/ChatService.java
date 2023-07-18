package com.buyte.chat.service;


import com.buyte.chat.dto.ChatReqDto;
import com.buyte.chat.entity.ChatRoom;
import com.buyte.chat.entity.Message;
import com.buyte.chat.repository.ChatRoomRepository;
import com.buyte.chat.repository.MessageRepository;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;


    @Transactional
    public void save(Long roomId, ChatReqDto message) {
        ChatRoom room = chatRoomRepository.findById(roomId).orElseThrow();
        Member sender = memberRepository.findById(message.getSenderId()).orElseThrow();
        Member receiver = memberRepository.findById(message.getReceiverId()).orElseThrow();

        Message chatMessage = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(message.getContent())
                .room(room)
                .build();

        messageRepository.save(chatMessage);
    }
}
