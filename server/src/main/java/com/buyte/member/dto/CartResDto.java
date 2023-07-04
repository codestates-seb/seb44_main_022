package com.buyte.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartResDto {

    private Long cartId;
    private Long productId;
    private String productName;
    private String productImagePath;
    private Long productPrice;
}
