package com.buyte.member.mapper;

import com.buyte.member.dto.CartResDto;
import com.buyte.member.entity.Cart;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {

    default List<CartResDto.CartInfo> cartsToCartsResDtos(List<Cart> cartList) {
        return cartList.stream().map(cart -> CartResDto.CartInfo.builder()
                .cartId(cart.getCartId())
                .productId(cart.getProduct().getProductId())
                .productName(cart.getProduct().getProductName())
                .productPrice(cart.getCartCustomProductPrice())
                .productImagePath(cart.getCartCustomProductImage())
                .productCount(cart.getProductCount())
                .build())
                .collect(Collectors.toList());
    }
}
