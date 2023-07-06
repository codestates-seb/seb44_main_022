package com.buyte.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


public class CartReqDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CartIds {

        private List<Long> cartIds;

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CartProductCount {

        private Long cartId;
        private Integer count;
    }

}
