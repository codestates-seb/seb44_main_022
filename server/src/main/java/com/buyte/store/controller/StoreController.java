package com.buyte.store.controller;

import com.buyte.store.dto.StoreDetailsDto;
import com.buyte.store.dto.StoreInfoDto;
import com.buyte.store.dto.StoreMapDto;
import com.buyte.store.service.StoreService;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping
    public ResponseEntity getStoreList(@RequestParam(required = false) String storeName) {

        List<StoreInfoDto> storeInfoDtoList = storeService.getStoreList(storeName);

        return new ResponseEntity<>(storeInfoDtoList, HttpStatus.OK);
    }

    @GetMapping("/map")
    public ResponseEntity getStoreMap() {

        List<StoreMapDto> storeMapDtoList = storeService.getStoreMap();

        return new ResponseEntity<>(storeMapDtoList, HttpStatus.OK);
    }

    @GetMapping("/{store-id}")
    public ResponseEntity getStoreDetails(@PathVariable("store-id") @Positive long storeId) {

        StoreDetailsDto storeDetails = storeService.getStoreDetails(storeId);

        return new ResponseEntity<>(storeDetails, HttpStatus.OK);
    }

}
