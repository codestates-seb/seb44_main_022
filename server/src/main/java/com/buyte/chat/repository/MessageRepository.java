package com.buyte.chat.repository;

import com.buyte.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByRoomRoomId(Long roomId);
}
