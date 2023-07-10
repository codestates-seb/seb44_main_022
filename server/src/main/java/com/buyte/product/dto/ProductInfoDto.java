package com.buyte.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductInfoDto {

    private long productId;
    private String productImage;
    private String productName;
    private Integer productPrice;
}
