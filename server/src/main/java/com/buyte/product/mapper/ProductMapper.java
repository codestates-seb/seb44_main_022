package com.buyte.product.mapper;

import com.buyte.product.dto.ProductInfoDto;
import com.buyte.product.dto.ProductPreferenceDto;
import com.buyte.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default ProductInfoDto productToProductResponse(Product product) {
        return ProductInfoDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .productType(product.getProductType())
            .build();
    }

    default ProductPreferenceDto productToFavorProduct(Product product) {
        return ProductPreferenceDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .build();
    }
}
