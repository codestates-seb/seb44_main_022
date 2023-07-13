package com.buyte.order.service;

import com.buyte.order.dto.OrderDto;

public interface OrdersService {

    void createOrders(OrderDto.OrderInfo orderInfo) throws Exception;
}
