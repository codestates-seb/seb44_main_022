package com.buyte.chat.service;

import com.buyte.chat.dto.RedisChat;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String,Object> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = redisTemplate.getStringSerializer().deserialize(message.getBody());
            RedisChat redisChat = objectMapper.readValue(publishMessage, RedisChat.class);
            messagingTemplate.convertAndSend("/sub/" + redisChat.getRoomId(), redisChat);
            log.info("레디스 메시지 수신");
        }
        catch (Exception e){
            log.error(e.getMessage());
        }
    }
}
