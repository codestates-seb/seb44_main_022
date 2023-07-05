package com.buyte.store.dto;

import com.buyte.product.dto.ProductDto;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StoreDetailsDto {

    private long memberId;
    private String storeName;
    private String storeAddress;
    private String storeintroduction;
    private String storeImage;
    private List<ProductDto.Response> productList;
}
