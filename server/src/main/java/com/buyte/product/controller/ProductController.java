package com.buyte.product.controller;

import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.service.ProductService;
import com.buyte.store.dto.StoreInfoDto;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/product")
@Validated
@Slf4j
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity getPreferenceProducts(@Positive @RequestParam int page) {

        PreferenceProductPageDto preferenceProductPageDto = productService.getPreferenceProducts(page - 1);

        return new ResponseEntity<>(preferenceProductPageDto, HttpStatus.OK);
    }
}
