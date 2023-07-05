package com.buyte.product.mapper;

import com.buyte.product.dto.ProductDto;
import com.buyte.product.dto.ProductDto.Response;
import com.buyte.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default ProductDto.Response productToProductResponse(Product product) {
        ProductDto.Response productResponseDto = new Response();

        productResponseDto.setProductId(product.getProductId());
        productResponseDto.setProductImage(product.getProductImage());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setProductPrice(product.getProductPrice());

        return productResponseDto;
    }
}