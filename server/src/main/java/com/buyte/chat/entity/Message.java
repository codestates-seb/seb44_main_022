package com.buyte.chat.entity;

import com.buyte.audit.Auditable;
import com.buyte.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "message")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "fk_sender"))
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "fk_receiver"))
    private Member receiver;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(nullable = false, name = "room")
    private ChatRoom room;


    @Builder
    public Message(Member sender, Member receiver, String content, ChatRoom room) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.room = room;
    }

}

