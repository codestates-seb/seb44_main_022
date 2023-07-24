package com.buyte.product.controller;

import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.service.ProductService;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@Validated
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity getPreferenceProducts(@Positive @RequestParam(required = false, defaultValue = "1") int page) {

        PreferenceProductPageDto preferenceProductPageDto = productService.getPreferenceProducts(page - 1);

        return new ResponseEntity<>(preferenceProductPageDto, HttpStatus.OK);
    }
}
