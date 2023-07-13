package com.buyte.order.controller;

import com.buyte.member.entity.Cart;
import com.buyte.member.repository.CartRepository;
import com.buyte.order.dto.OrderDto;
import com.buyte.order.service.OrdersService;
import com.buyte.order.service.OrdersServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OrdersController {

    private final OrdersServiceImpl ordersService;
    private final CartRepository cartRepository;


//    @PostMapping("/order/{member_id}")
//    public ResponseEntity createOrder(@RequestBody OrderDto.CreateOrderReq orderReqDto,
//                                      @PathVariable(name = "member_id") Long memberId) throws Exception {
//        ordersService.createOrders(orderReqDto,memberId);
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @PostMapping("/order/payment")
    public ResponseEntity<String> paymentVerify(@RequestBody OrderDto.OrderInfo orderInfo) throws Exception {

        String token = ordersService.getToken();
        log.info("토큰: {}",token);

        int amount = ordersService.paymentInfo(orderInfo.getImpUid(), token);
        log.info("결제금액: {}",amount);

        try {
            List<Long> cartIds = orderInfo.getCartIds();
            List<Cart> cartList = cartRepository.findAllByCartIdIn(cartIds);
            Integer totalPrice = 0;
            for (Cart cart : cartList) {
                totalPrice += cart.getProduct().getProductPrice() * cart.getProductCount();
            }

            if (totalPrice + 3500 != amount) {
                ordersService.payMentCancle(token, orderInfo.getImpUid(), amount, "결제 금액 오류");
                return new ResponseEntity<String>("결제 금액 오류, 결제 취소", HttpStatus.BAD_REQUEST);
            }

            ordersService.createOrders(orderInfo);
            return new ResponseEntity<>("주문이 완료되었습니다", HttpStatus.OK);

        } catch (Exception e) {
            ordersService.payMentCancle(token, orderInfo.getImpUid(), amount, "결제 에러");
            return new ResponseEntity<String>("결제 에러", HttpStatus.BAD_REQUEST);
        }
    }
}

