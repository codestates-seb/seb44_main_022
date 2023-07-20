package com.buyte.order.dto;

import lombok.*;

import java.util.List;

public class OrderDto {

    @Getter
    @NoArgsConstructor
    public static class OrderInfo {

        private String impUid;
        private List<Long> cartIds;
        private String userName;
        private String address;
    }
}
