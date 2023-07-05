package com.buyte.store.mapper;

import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StoreMapper {

    default StoreDetailsDto storeToStoreDetails(Store store) {
        StoreDetailsDto storeDetailsDto = new StoreDetailsDto();
        storeDetailsDto.setStoreName(store.getStoreName());
        storeDetailsDto.setMemberId(store.getStoreId());
        storeDetailsDto.setStoreAddress(store.getStoreAddress());
        storeDetailsDto.setStoreintroduction(store.getStoreIntroduction());
        storeDetailsDto.setStoreImage(store.getStoreImage());

        return storeDetailsDto;
    }

    default StoreInfoDto storeToStoreInfo(Store store) {
        StoreInfoDto storeInfoDto = new StoreInfoDto();
        storeInfoDto.setStoreId(store.getStoreId());
        storeInfoDto.setStoreImage(store.getStoreImage());
        storeInfoDto.setStoreName(store.getStoreName());
        storeInfoDto.setStoreAddress(store.getStoreAddress());

        return storeInfoDto;
    }

    default StoreMapDto storeToStoreMap(Store store) {
        StoreMapDto storeMapDto = new StoreMapDto();
        storeMapDto.setStoreId(store.getStoreId());
        storeMapDto.setStoreLatitude(store.getStoreLatitude());
        storeMapDto.setStoreLongitude(store.getStoreLongitude());
        storeMapDto.setStoreName(store.getStoreName());
        storeMapDto.setStoreIntroduction(store.getStoreIntroduction());
        storeMapDto.setStoreImage(store.getStoreImage());

        return storeMapDto;
    }
}
