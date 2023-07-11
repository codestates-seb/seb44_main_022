package com.buyte.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomProductInfoDto {

    private long productId;
    private String productName;
    private String productImage;
    private Integer productPrice;
}
