package com.buyte.order.entity;

import com.buyte.audit.Auditable;
import com.buyte.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Orders extends Auditable {

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
    private Long orderPrice;


    @Column(name = "order_state")
    @Enumerated(EnumType.STRING)
    private OrderState orderState;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderProduct> orderProductList = new ArrayList<>();

    public enum OrderState {

        CANCELLATION,
        SUSPENSION,
        FAILURE,
        COMPLETION
    }

    public Orders(Member member) {
        this.member = member;
    }

    public void setOrder(Long orderPrice, String orderAddress) {
        this.orderPrice = orderPrice;
        this.orderAddress = orderAddress;
        this.orderState = OrderState.SUSPENSION;
    }
}
