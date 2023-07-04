package com.buyte.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ProductDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private long productId;
        private String productImages;
        private String productName;
        private Integer productPrice;
    }
}
