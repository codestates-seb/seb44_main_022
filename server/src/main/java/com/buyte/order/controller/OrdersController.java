package com.buyte.order.controller;

import com.buyte.order.dto.OrderDto;
import com.buyte.order.service.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OrdersController {

    private final OrdersService ordersService;


    @PostMapping("/order/{member_id}")
    public ResponseEntity createOrder(@RequestBody OrderDto.CreateOrderReq orderReqDto,
                                      @PathVariable(name = "member_id") Long memberId) throws Exception {
        ordersService.createOrders(orderReqDto,memberId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
