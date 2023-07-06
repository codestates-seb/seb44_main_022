package com.buyte.product.service;

import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.product.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public List<PreferenceProductDto> getPreferenceProductList(String cartegory) {
        List<Product> findProductList = productRepository.findByPreferenceProduct(PreferenceProduct.PREFERRED);

        List<PreferenceProductDto> preferenceProductDtoList =findProductList.stream()
            .map(product -> productMapper.productToPreferenceProduct(product)).collect(Collectors.toList());

        return preferenceProductDtoList;
    }


    /*
        @Transactional(readOnly = true)
    public List<StoreMapDto> getStoreMap() {

        List<Store> storeList = storeRepository.findAll();

        List<StoreMapDto> storeMapDtoList = new ArrayList<>();

        storeList.forEach(store -> {
            StoreMapDto storeMapDto = storeMapper.storeToStoreMap(store);

            List<PreferenceProductDto> productPreferenceList = store.getProductList().stream()
                .filter(product -> product.getPreferenceProduct() == PreferenceProduct.PREFERRED)
                .map(productMapper::productToPreferenceProduct).collect(Collectors.toList());

            storeMapDto.setProductPreferenceList(productPreferenceList);
            storeMapDtoList.add(storeMapDto);
        });

        return storeMapDtoList;
    }
     */
}
