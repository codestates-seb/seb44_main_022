package com.buyte.product.mapper;

import com.buyte.dto.PageInfoDto;
import com.buyte.product.dto.CustomProductInfoDto;
import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.dto.ProductDetailsDto;
import com.buyte.product.dto.ProductInfoDto;
import com.buyte.product.dto.StandardProductInfoDto;
import com.buyte.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default ProductInfoDto productToProductInfo(Product product) {
        return ProductInfoDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .build();
    }

    default CustomProductInfoDto productToCustomProductInfo(Product product) {
        return CustomProductInfoDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .build();
    }

    default StandardProductInfoDto productToStandardProductInfo(Product product) {
        return StandardProductInfoDto.builder()
            .productId(product.getProductId())
            .productImage(product.getProductImage())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
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

    default ProductDetailsDto productToProductDetails(Product product) {
        return ProductDetailsDto.builder()
            .productId(product.getProductId())
            .productName(product.getProductName())
            .productPrice(product.getProductPrice())
            .productIntroduction(product.getProductIntroduction())
            .productImage(product.getProductImage())
            .build();
    }

    default PreferenceProductPageDto productPageToPreferenceProductPage(Page<Product> productPage) {
        return PreferenceProductPageDto.builder()
            .pageInfo(PageInfoDto.builder()
                .page(productPage.getNumber() + 1)
                .size(productPage.getSize())
                .totalPage(productPage.getTotalPages())
                .totalElement(productPage.getTotalElements())
                .build())
            .build();

    }
}
