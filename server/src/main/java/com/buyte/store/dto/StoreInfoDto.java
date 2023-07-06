package com.buyte.store.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreInfoDto {

    private long storeId;
    private String storeImage;
    private String storeName;
    private String storeAddress;
}
