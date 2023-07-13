package com.buyte.order.service;

import com.buyte.order.dto.OrderDto;
import org.springframework.http.ResponseEntity;

public interface OrdersService {

    ResponseEntity<String> verifyOrder(OrderDto.OrderInfo orderInfo) throws Exception;
}
