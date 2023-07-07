package com.buyte.store.mapper;

import com.buyte.dto.PageInfoDto;
import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoDto;
import com.buyte.store.dto.StoreInfoPageDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StoreMapper {

    default StoreDetailsDto storeToStoreDetails(Store store) {
        return StoreDetailsDto.builder()
            .memberId(store.getMember().getMemberId())
            .storeName(store.getStoreName())
            .storeAddress(store.getStoreAddress())
            .storeImage(store.getStoreImage())
            .storeIntroduction(store.getStoreIntroduction())
            .build();
    }

    default StoreInfoDto storeToStoreInfo(Store store) {
        return StoreInfoDto.builder()
            .storeId(store.getStoreId())
            .storeImage(store.getStoreImage())
            .storeName(store.getStoreName())
            .storeAddress(store.getStoreAddress())
            .build();
    }

    default StoreMapDto storeToStoreMap(Store store) {
        return StoreMapDto.builder()
            .storeId(store.getStoreId())
            .storeLatitude(store.getStoreLatitude())
            .storeLongitude(store.getStoreLongitude())
            .storeImage(store.getStoreImage())
            .storeName(store.getStoreName())
            .storeIntroduction(store.getStoreIntroduction())
            .build();
    }

    default StoreInfoPageDto storePageToStoreInfoPage(Page<Store> storePage) {
        return StoreInfoPageDto.builder()
            .pageInfo(PageInfoDto.builder()
                .page(storePage.getNumber() + 1)
                .size(storePage.getSize())
                .totalPage(storePage.getTotalPages())
                .totalElement(storePage.getTotalElements())
                .build())
            .build();
    }
}
