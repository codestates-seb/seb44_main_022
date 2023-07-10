package com.buyte.member.controller;

import com.buyte.member.dto.CartReqDto;
import com.buyte.member.dto.CartResDto;
import com.buyte.member.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/cart")
    public ResponseEntity<CartResDto.CartAllInfo> getCartInfo() throws Exception {
        CartResDto.CartAllInfo memberCart = cartService.getInfoMemberCart();

        return ResponseEntity.ok(memberCart);
    }

    @DeleteMapping("/cart/delete") //cartid를 위조해서 보낼시 다른사람 카트 목록 삭제???
    public ResponseEntity deletePorducts(@RequestBody CartReqDto.CartIds cartIds) {
        cartService.deleteSelectedProducts(cartIds);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/store/{store_id}/{custom_item_id}")
    public ResponseEntity addProduct(@PathVariable(name = "custom_item_id") Long productId) {
        cartService.addProductToCart(productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/store/{store_id}/{custom_item_id}/custom")
    public ResponseEntity addCustomProduct(@RequestPart(value = "file") MultipartFile file,
                                           @PathVariable(name = "custom_item_id") Long productId) throws IOException {
        cartService.addCustomProductToCart(file,productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/cart")
    public ResponseEntity updateProductCount(@RequestBody CartReqDto.CartProductCount cartProductCount) {
        if(cartProductCount.getCount() <= 0) {
            return new ResponseEntity<>("1개 이상",HttpStatus.BAD_REQUEST);
        }
        CartResDto.PatchTotalPrcie patchTotalPrcie = cartService.updateProductCount(cartProductCount);
        return ResponseEntity.ok(patchTotalPrcie);
    }

    @PostMapping("/cart/payment")
    public ResponseEntity<CartResDto.CartAllInfo> paymentPorducts(@RequestBody CartReqDto.CartIds cartIds) {
        CartResDto.CartAllInfo selectedCart = cartService.paymentSelectedProduct(cartIds);

        return ResponseEntity.ok(selectedCart);
    }

}
