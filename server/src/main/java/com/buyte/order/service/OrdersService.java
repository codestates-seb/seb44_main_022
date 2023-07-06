package com.buyte.order.service;

import com.buyte.order.dto.OrderDto;

public interface OrdersService {

    void createOrders(OrderDto.CreateOrderReq orderDtoReq, Long memberId) throws Exception;
}
