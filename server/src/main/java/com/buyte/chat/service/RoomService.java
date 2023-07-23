package com.buyte.chat.service;

import com.buyte.chat.dto.RoomRequest;
import com.buyte.chat.dto.RoomResponse;
import com.buyte.chat.dto.SellerRoomDto;
import com.buyte.chat.entity.ChatRoom;
import com.buyte.chat.repository.ChatRoomRepository;
import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.utils.SecurityUtil;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.MemberRepository;
import com.buyte.store.entity.Store;
import com.buyte.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;
    private Map<String, ChannelTopic> topics;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private HashOperations<String, String, RoomResponse> opsHashChatRoom;
    private final RedisTemplate<String,Object> redisTemplate;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    public RoomResponse findOrCreate(RoomRequest roomRequest) {

        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Member custromer = memberRepository.findById(authenticatedMemberId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Store store = storeRepository.findById(roomRequest.getStoreId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.STORE_NOT_FOUND));
        Member merchant = store.getMember();
        ChatRoom room = chatRoomRepository.findByCustomerAndMerchantAndStoreName(custromer, merchant, store.getStoreName())
                .orElseGet(() -> new ChatRoom(merchant,custromer,store.getStoreName()));
        ChatRoom chatRoom = chatRoomRepository.save(room);
        String roomId = "room" + chatRoom.getRoomId();
        topics.computeIfAbsent(roomId, this::addTopic);
        RoomResponse roomResponse = RoomResponse.builder()
                .senderId(custromer.getMemberId())
                .receiverId(merchant.getMemberId())
                .roomId(chatRoom.getRoomId())
                .build();
        opsHashChatRoom.put(CHAT_ROOMS,roomId,roomResponse);
        log.info("Redis 정보 생성");

        return roomResponse;

    }

    private ChannelTopic addTopic(String roomId) {

        ChannelTopic topic = new ChannelTopic(roomId);
        log.info("토픽 생성");
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        log.info("토픽 주입");
        return topic;
    }


    @Transactional
    public List<SellerRoomDto> findAllRoom() {

        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Member merchant = memberRepository.findById(authenticatedMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        List<ChatRoom> allChatRoom = chatRoomRepository.findAllByMerchant(merchant);
        List<SellerRoomDto> allRoomDto = new ArrayList<>();

        for(ChatRoom chatRoom : allChatRoom) {

            Hibernate.initialize(chatRoom.getMerchant());
            Hibernate.initialize(chatRoom.getCustomer());

            String roomId = "room" + chatRoom.getRoomId();
            topics.computeIfAbsent(roomId, this::addTopic);

            SellerRoomDto roomResponse = SellerRoomDto.builder()
                    .roomId(chatRoom.getRoomId())
                    .senderId(chatRoom.getMerchant().getMemberId())
                    .receiverId(chatRoom.getCustomer().getMemberId())
                    .customerName(chatRoom.getCustomer().getMemberName())
                    .storeName(chatRoom.getStoreName())
                    .build();
            allRoomDto.add(roomResponse);
        }

        return allRoomDto;
    }
}
