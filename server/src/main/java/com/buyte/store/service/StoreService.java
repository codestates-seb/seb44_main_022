package com.buyte.store.service;

import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoPageDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.entity.Store;
import java.util.List;

public interface StoreService {

    StoreInfoPageDto getStoreList(int page, String search);

    List<StoreMapDto> getStoreMap();

    StoreDetailsDto getStoreDetails(long storeId);

    Store findVerifiedStore(long storeId);
}
