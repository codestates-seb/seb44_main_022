package com.buyte.store.dto;

import com.buyte.product.dto.ProductInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreDetailsDto {

    private long memberId;
    private String storeName;
    private String storeAddress;
    private String storeIntroduction;
    private String storeImage;
    private List<ProductInfoDto> productInfoList;
}
