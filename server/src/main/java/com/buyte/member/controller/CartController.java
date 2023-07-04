package com.buyte.member.controller;

import com.buyte.member.dto.CartResDto;
import com.buyte.member.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/cart/{member-id}")
    public ResponseEntity<List<CartResDto>> getCartInfo(@PathVariable(name = "member-id") Long memberId) throws Exception {
        List<CartResDto> memberCart = cartService.getInfoMemberCart(memberId);

        return ResponseEntity.ok(memberCart);
    }

    @DeleteMapping("/cart/{member-id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePorducts(@RequestBody List<Long> cartIds) throws Exception {
        cartService.deleteSelectedProducts(cartIds);
    }


}
