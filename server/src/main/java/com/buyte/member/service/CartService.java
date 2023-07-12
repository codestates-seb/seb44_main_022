package com.buyte.member.service;

import com.buyte.member.dto.CartReqDto;
import com.buyte.member.dto.CartResDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CartService {

    CartResDto.CartAllInfo getInfoMemberCart() throws Exception;

    void deleteSelectedProducts(CartReqDto.CartIds cartIds);

    void addProductToCart(Long productId);

    void addCustomProductToCart(MultipartFile file, Long productId) throws IOException;

    CartResDto.PatchTotalPrcie updateProductCount(CartReqDto.CartProductCount cartProductCount);

    CartResDto.CartAllInfo paymentSelectedProduct(CartReqDto.CartIds cartIds);
}
