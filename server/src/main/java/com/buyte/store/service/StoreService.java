package com.buyte.store.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.product.dto.FavorProductDto;
import com.buyte.product.dto.ProductDto;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.ProductFavor;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.product.repository.ProductRepository;
import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.entity.Store;
import com.buyte.store.mapper.StoreMapper;
import com.buyte.store.repository.StoreRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
public class StoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;
    private final ProductMapper productMapper;

    public StoreService(StoreRepository storeRepository, StoreMapper storeMapper,
        ProductMapper productMapper) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public List<StoreInfoDto> getStoreList(String storeName) {

        log.info("# storeName : " + storeName);

        List<Store> storeList;

        if (storeName != null) {
            storeList = storeRepository.findByStoreNameContaining(storeName);
            storeList.forEach(item -> log.info("# store: " + item.getStoreId()));
        } else {
            storeList = storeRepository.findAll(Sort.by("createdAt").descending());
            storeList.forEach(item -> log.info("# store: " + item.getStoreId()));
        }

        List<StoreInfoDto> storeInfoDtoList = storeList.stream()
            .map(store -> storeMapper.storeToStoreInfo(store))
            .collect(Collectors.toList());

        return storeInfoDtoList;
    }

    @Transactional(readOnly = true)
    public List<StoreMapDto> getStoreMap() {

        List<Store> storeList = storeRepository.findAll();

        List<StoreMapDto> storeMapDtoList = new ArrayList<>();

        storeList.forEach(store -> {
            StoreMapDto storeMapDto = storeMapper.storeToStoreMap(store);

            List<FavorProductDto> favorProductDtoList = store.getProductList().stream()
                .filter(product -> product.getProductFavor() == ProductFavor.FAVOR)
                .map(productMapper::productToFavorProduct)
                .collect(Collectors.toList());

            storeMapDto.setFavorProductList(favorProductDtoList);
            storeMapDtoList.add(storeMapDto);
        });

        return storeMapDtoList;
    }


    @Transactional(readOnly = true)
    public StoreDetailsDto getStoreDetails(long storeId) {

        log.info("# sotreId : " + storeId);

        Store findStore = findStore(storeId);

        List<Product> productList = findStore.getProductList();

        List<ProductDto.Response> productResponseDtoList = productList.stream()
            .map(product -> productMapper.productToProductResponse(product))
            .collect(Collectors.toList());

        StoreDetailsDto storeDetailsDto = storeMapper.storeToStoreDetails(findStore);
        storeDetailsDto.setProductList(productResponseDtoList);

        return storeDetailsDto;
    }

    @Transactional(readOnly = true)
    public Store findStore(long storeId) {
        return findVerifiedStore(storeId);
    }

    @Transactional(readOnly = true)
    public Store findVerifiedStore(long storeId) {
        Optional<Store> optionalStore = storeRepository.findById(storeId);
        Store findStore = optionalStore.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.STORE_NOT_FOUND)
        );
        return findStore;
    }
}
