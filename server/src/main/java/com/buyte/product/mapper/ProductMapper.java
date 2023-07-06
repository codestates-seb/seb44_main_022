package com.buyte.product.mapper;

import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.dto.ProductInfoDto;
import com.buyte.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default ProductInfoDto productToProductInfo(Product product) {
        return ProductInfoDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .productType(product.getProductType())
            .build();
    }

    default PreferenceProductDto productToPreferenceProduct(Product product) {
        return PreferenceProductDto.builder()
            .productId(product.getProductId())
            .storeId(product.getStore().getStoreId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .build();
    }
}
