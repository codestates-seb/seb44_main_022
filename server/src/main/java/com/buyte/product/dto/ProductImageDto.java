package com.buyte.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImageDto {

    private long productId;
    private String productImage;
}
