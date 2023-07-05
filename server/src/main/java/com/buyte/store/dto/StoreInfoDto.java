package com.buyte.store.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StoreInfoDto {

    private long storeId;
    private String storeImage;
    private String storeName;
    private String storeAddress;
}
