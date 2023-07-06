package com.buyte.store.dto;

import com.buyte.product.dto.ProductInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class StoreMapDto {
    private long storeId;
    private double storeLatitude;
    private double storeLongitude;
    private String storeImage;
    private String storeName;
    private String storeIntroduction;
    private List<ProductInfoDto> productPreferenceList;
}
