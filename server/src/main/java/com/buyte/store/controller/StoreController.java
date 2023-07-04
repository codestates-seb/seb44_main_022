package com.buyte.store.controller;

import com.buyte.store.dto.StoreDto;
import com.buyte.store.service.StoreService;
import javax.validation.constraints.Positive;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/store")
@Validated
@Slf4j
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/{store-id}")
    public ResponseEntity getStore(@PathVariable("store-id") @Positive long storeId) {

        StoreDto.Response storeDetails = storeService.getStoreDetails(storeId);

        return new ResponseEntity<>(storeDetails, HttpStatus.OK);
    }

}
