package com.buyte.store.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.product.dto.CustomProductInfoDto;
import com.buyte.product.dto.ProductImageDto;
import com.buyte.product.dto.StandardProductInfoDto;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import com.buyte.product.entity.Product.ProductType;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoDto;
import com.buyte.store.dto.StoreInfoPageDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.entity.Store;
import com.buyte.store.mapper.StoreMapper;
import com.buyte.store.repository.StoreRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StoreServiceImpl implements StoreService{

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public StoreInfoPageDto getStores(int page, String search) {

        log.info("# storeName : {}", search);

        Pageable pageable = PageRequest.of(page, 20, Sort.by("createdAt").descending());
        Page<Store> findStorePage = search != null
            ? storeRepository.findByStoreNameContaining(search, pageable)
            : storeRepository.findAll(pageable);

        List<StoreInfoDto> storeInfoList = findStorePage.getContent().stream()
            .map(storeMapper::storeToStoreInfo)
            .collect(Collectors.toList());

        StoreInfoPageDto storeInfoPageDto = storeMapper.storePageToStoreInfoPage(findStorePage);
        storeInfoPageDto.setStoreInfoList(storeInfoList);

        return storeInfoPageDto;
    }

    @Transactional(readOnly = true)
    public List<StoreMapDto> getStoreMap() {

        List<Store> allStoreList = storeRepository.findAll();

        List<StoreMapDto> storeMapList = new ArrayList<>();

        allStoreList.forEach(store -> {
            StoreMapDto storeMapDto = storeMapper.storeToStoreMap(store);

            List<ProductImageDto> productImageList = store.getProductList().stream()
                .filter(product -> product.getPreferenceProduct() == PreferenceProduct.PREFERRED)
                .map(productMapper::productToProductImage).collect(Collectors.toList());

            storeMapDto.setProductPreferenceList(productImageList);
            storeMapList.add(storeMapDto);
        });

        return storeMapList;
    }

    @Transactional(readOnly = true)
    public StoreDetailsDto getStoreDetails(long storeId) {

        log.info("# storeId : {}", storeId);

        Store findStore = findVerifiedStore(storeId);

        List<Product> productList = findStore.getProductList();

        StoreDetailsDto storeDetailsDto = storeMapper.storeToStoreDetails(findStore);

        List<CustomProductInfoDto> customProductInfoList = new ArrayList<>();
        List<StandardProductInfoDto> standardProductInfoList = new ArrayList<>();

        productList.forEach(product -> {
            if (product.getProductType() == ProductType.CUSTOM) {
                customProductInfoList.add(productMapper.productToCustomProductInfo(product));
            } else if (product.getProductType() == ProductType.STANDARD) {
                standardProductInfoList.add(productMapper.productToStandardProductInfo(product));
            }
        });

        storeDetailsDto.setCustomProductInfoList(customProductInfoList);
        storeDetailsDto.setStandardProductInfoList(standardProductInfoList);

        return storeDetailsDto;
    }

    @Transactional(readOnly = true)
    public Store findVerifiedStore(long storeId) {
        return storeRepository.findById(storeId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.STORE_NOT_FOUND));
    }
}
