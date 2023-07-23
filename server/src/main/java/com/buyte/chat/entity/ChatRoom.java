package com.buyte.chat.entity;

import com.buyte.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "fk_merchant"))
    private Member merchant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "fk_customer"))
    private Member customer;

    @Column(name = "store_name")
    private String storeName;

    public ChatRoom(Member merchant, Member customer, String storeName) {
        this.merchant = merchant;
        this.customer = customer;
        this.storeName = storeName;
    }
}