package com.buyte.store.service;

import com.buyte.product.dto.ProductDto;
import com.buyte.product.entity.Product;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.store.dto.StoreDto;
import com.buyte.store.entity.Store;
import com.buyte.store.mapper.StoreMapper;
import com.buyte.store.repository.StoreRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public StoreDto.Response getStoreDetails(long storeId) {
        Store findStore = findStore(storeId);

        List<Product> productList = findStore.getProductList();

        List<ProductDto.Response> productResponseDtoList = productList.stream()
            .map(product -> productMapper.productToProductResponse(product))
            .collect(Collectors.toList());

        StoreDto.Response storeResponseDto = storeMapper.storeToStoreResponse(findStore);
        storeResponseDto.setProductList(productResponseDtoList);

        return storeResponseDto;
    }

    @Transactional(readOnly = true)
    public Store findStore(long storeId) {
        return findVerifiedStore(storeId);
    }

    @Transactional(readOnly = true)
    public Store findVerifiedStore(long storeId) {
        Optional<Store> optionalStore = storeRepository.findById(storeId);
        Store findStore = optionalStore.orElseThrow(
            //() -> new
        );
        return findStore;
    }
}
