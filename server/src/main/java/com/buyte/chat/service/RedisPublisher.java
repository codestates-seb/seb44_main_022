package com.buyte.chat.service;

import com.buyte.chat.dto.RedisChat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, RedisChat message){
        redisTemplate.convertAndSend(topic.getTopic(), message);
        log.info("레디스 메시지 전송");
    }
}