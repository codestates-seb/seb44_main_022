package com.buyte.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FavorProductDto {
    private long productId;
    private String productImage;
    private String productName;
    private Integer productPrice;
}
