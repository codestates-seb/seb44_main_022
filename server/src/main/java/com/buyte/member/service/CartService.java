package com.buyte.member.service;

import com.buyte.member.dto.CartReqDto;
import com.buyte.member.dto.CartResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CartService {

    List<CartResDto> getInfoMemberCart(Long memberId) throws Exception;

    void deleteSelectedProducts(CartReqDto.CartIds cartIds) throws Exception;

    void addProductToCart(Long productId) throws Exception;

    void addCustomProductToCart(MultipartFile file, Long productId) throws Exception;

    void updateProductCount(CartReqDto.CartProductCount cartProductCount) throws Exception;
}
