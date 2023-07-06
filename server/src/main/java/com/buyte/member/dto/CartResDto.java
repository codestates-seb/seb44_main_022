package com.buyte.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class CartResDto {

    @Builder
    @Getter
    public static class CartAllInfo {

        private List<CartInfo> cartInfos;
        private Integer totalPrice;
    }

    @Builder
    @Getter
    public static class CartInfo {

        private Long cartId;
        private Long productId;
        private String productName;
        private String productImagePath;
        private Integer productPrice;
        private Integer productCount;
    }

}
