package com.buyte.store.dto;

import com.buyte.product.dto.ProductDto;
import com.buyte.product.dto.ProductDto.Response;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class StoreDto {

    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String storeName;
        private String storeAddress;
        private String storeintroduction;
        private String storeImage;
        private List<ProductDto.Response> productList;
    }
}
