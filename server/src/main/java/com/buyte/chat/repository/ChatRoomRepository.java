package com.buyte.chat.repository;

import com.buyte.chat.entity.ChatRoom;
import com.buyte.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByCustomerAndMerchant(Member customer, Member merchant);

    List<ChatRoom> findAllByMerchant(Member merchant);
}
