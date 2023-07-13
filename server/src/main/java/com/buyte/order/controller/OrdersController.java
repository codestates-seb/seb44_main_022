package com.buyte.order.controller;

import com.buyte.order.dto.OrderDto;
import com.buyte.order.service.OrdersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OrdersController {

    private final OrdersService ordersService;


    @PostMapping("/order/payment")
    public ResponseEntity<String> paymentVerify(@RequestBody OrderDto.OrderInfo orderInfo) throws Exception {
        ResponseEntity<String> orderResult = ordersService.verifyOrder(orderInfo);

        return orderResult;
    }
}

