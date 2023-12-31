package com.buyte.store.dto;

import com.buyte.product.dto.CustomProductInfoDto;
import com.buyte.product.dto.StandardProductInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreDetailsDto {

    private long memberId;
    private String storeName;
    private String storeAddress;
    private double storeLatitude;
    private double storeLongitude;
    private String storeIntroduction;
    private String storeImage;
    private String storePhoneNumber;
    private Long storeId;
    private List<CustomProductInfoDto> customProductInfoList;
    private List<StandardProductInfoDto> standardProductInfoList;
}
