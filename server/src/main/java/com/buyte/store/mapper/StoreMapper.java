package com.buyte.store.mapper;

import com.buyte.store.dto.StoreDto;
import com.buyte.store.dto.StoreDto.Response;
import com.buyte.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StoreMapper {

    default StoreDto.Response storeToStoreResponse(Store store) {
        StoreDto.Response storeResponseDto = new Response();
        storeResponseDto.setStoreName(store.getStoreName());
        storeResponseDto.setMemberId(store.getStoreId());
        storeResponseDto.setStoreAddress(store.getStoreAddress());
        storeResponseDto.setStoreintroduction(store.getStoreIntroduction());
        storeResponseDto.setStoreImage(store.getStoreImage());

        return storeResponseDto;
    }
}
