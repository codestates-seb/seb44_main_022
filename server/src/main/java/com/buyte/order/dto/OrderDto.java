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

    @Getter
    @NoArgsConstructor
    public static class OrderInfo {

        private String impUid;
        private List<Long> cartIds;
        private String userName;
        private String address;
    }
}
