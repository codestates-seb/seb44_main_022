package com.buyte.product.service;

import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.dto.ProductDetailsDto;
import com.buyte.product.entity.Product;

public interface ProductService {
    PreferenceProductPageDto getPreferenceProducts(int page);

    ProductDetailsDto getProductDetails(long storeId, long productId);

    Product findVerifiedProduct(long productId);
}
