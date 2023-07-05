package com.buyte.store.dto;

import com.buyte.product.dto.FavorProductDto;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StoreMapDto {
    private long storeId;
    private double storeLatitude;
    private double storeLongitude;
    private String storeImage;
    private String storeName;
    private String storeIntroduction;
    private List<FavorProductDto> favorProductList;
}
