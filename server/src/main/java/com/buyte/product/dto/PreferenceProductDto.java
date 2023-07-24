package com.buyte.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PreferenceProductDto {
    private long productId;
    private long storeId;
    private String productImage;
    private String productName;
    private Integer productPrice;
}
