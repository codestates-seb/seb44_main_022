package com.buyte.order.entity;

import com.buyte.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "order_address")
    private String orderAddress;

    @Column(name = "order_price")
    private Integer orderPrice;

    @Column(name = "order_state")
    private OrderState orderState;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderProduct> orderProductList = new ArrayList<>();

    public enum OrderState {

        CANCELLATION,
        SUSPENSION,
        FAILURE,
        COMPLETION
    }
}
