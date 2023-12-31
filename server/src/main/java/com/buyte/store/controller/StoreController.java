package com.buyte.store.controller;

import com.buyte.product.dto.CustomProductDetailsDto;
import com.buyte.product.dto.ProductDetailsDto;
import com.buyte.product.service.ProductService;
import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoPageDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.service.StoreService;
import java.util.List;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
@Validated
public class StoreController {

    private final StoreService storeService;
    private final ProductService productService;

    public StoreController(StoreService storeService, ProductService productService) {
        this.storeService = storeService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity getStoreList(
        @RequestParam(required = false, defaultValue = "1") int page,
        @RequestParam(required = false) String search) {

        StoreInfoPageDto storeInfoPageDto = storeService.getStoreList(page - 1, search);

        return new ResponseEntity<>(storeInfoPageDto, HttpStatus.OK);
    }

    @GetMapping("/map")
    public ResponseEntity getStoreMap() {

        List<StoreMapDto> storeMapList = storeService.getStoreMap();

        return new ResponseEntity<>(storeMapList, HttpStatus.OK);
    }

    @GetMapping("/{store-id}")
    public ResponseEntity getStoreDetails(@PathVariable("store-id") @Positive long storeId) {

        StoreDetailsDto storeDetails = storeService.getStoreDetails(storeId);

        return new ResponseEntity<>(storeDetails, HttpStatus.OK);
    }

    @GetMapping("/{store-id}/{product-id}")
    public ResponseEntity getProductDetails(@PathVariable("store-id") @Positive long storeId,
        @PathVariable("product-id") @Positive long productId) {

        ProductDetailsDto productDetailsDto = productService.getProductDetails(storeId, productId);

        return new ResponseEntity<>(productDetailsDto, HttpStatus.OK);
    }

    @GetMapping("/{store-id}/custom/{product-id}")
    public ResponseEntity getCustomProductDetails(@PathVariable("store-id") @Positive long storeId,
        @PathVariable("product-id") @Positive long productId) {

        CustomProductDetailsDto customProductIngredientDto = productService.getCustomProductDetails(storeId, productId);

        return new ResponseEntity<>(customProductIngredientDto, HttpStatus.OK);
    }
}
