package com.buyte.member.controller;

import com.buyte.member.dto.CartResDto;
import com.buyte.member.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/cart/{member_id}")
    public ResponseEntity<List<CartResDto>> getCartInfo(@PathVariable(name = "member_id") Long memberId) throws Exception {
        List<CartResDto> memberCart = cartService.getInfoMemberCart(memberId);

        return ResponseEntity.ok(memberCart);
    }

    @DeleteMapping("/cart/{member_id}/delete")
    public ResponseEntity deletePorducts(@RequestBody List<Long> cartIds) throws Exception {
        cartService.deleteSelectedProducts(cartIds);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/store/{store_id}/{custom_item_id}")
    public ResponseEntity addProduct(@PathVariable(name = "custom_item_id") Long productId) throws Exception {
        cartService.addProductToCart(productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/store/{store_id}/{custom_item_id}/custom")
    public ResponseEntity addCustomProduct(@RequestPart(value = "file") MultipartFile file,
                                           @PathVariable(name = "custom_item_id") Long productId) throws Exception {
        cartService.addCustomProductToCart(file,productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
