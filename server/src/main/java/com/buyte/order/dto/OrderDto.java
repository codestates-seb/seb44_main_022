package com.buyte.order.dto;

import lombok.*;

import java.util.List;

public class OrderDto {

    @Getter
    @NoArgsConstructor
    public static class CreateOrderReq {

        private List<CartIdCount> cartIdCounts;
        private String name;

    }

    @Getter
    @NoArgsConstructor
    public static class CartIdCount {

        private Long cartId;
        private Long quantities;
    }
}
