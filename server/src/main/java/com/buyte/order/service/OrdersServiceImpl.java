package com.buyte.order.service;

import com.buyte.member.entity.Cart;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.CartRepository;
import com.buyte.member.repository.MemberRepository;
import com.buyte.order.dto.OrderDto;
import com.buyte.order.entity.OrderProduct;
import com.buyte.order.entity.Orders;
import com.buyte.order.repository.OrderProductRepository;
import com.buyte.order.repository.OrdersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrdersServiceImpl implements OrdersService{

    private final MemberRepository memberRepository;
    private final OrdersRepository ordersRepository;
    private final OrderProductRepository orderProductRepository;
    private final CartRepository cartRepository;


    @Override
    public void createOrders(OrderDto.CreateOrderReq orderReqDto, Long memberId) throws Exception {

        //회원 주입 변경
        Member member = memberRepository.findById(memberId).orElseThrow();
        Orders orders = new Orders(member);
        Long totalOrderPrice = 0L;
        ordersRepository.save(orders);

        List<OrderDto.CartIdCount> cartIdCounts = orderReqDto.getCartIdCounts();
        for (OrderDto.CartIdCount cartIdCount : cartIdCounts) {
            Cart cart = cartRepository.findById(cartIdCount.getCartId()).orElseThrow();
            Long quantities = cartIdCount.getQuantities();
            OrderProduct orderProduct = new OrderProduct(cart.getProduct(), cart.getCartCustomProductImage(), quantities);
            orderProduct.setOrder(orders);
            orderProductRepository.save(orderProduct);
            cartRepository.delete(cart);
            totalOrderPrice += cart.getProduct().getProductPrice() * cartIdCount.getQuantities();
        }
        orders.setOrderPrice(totalOrderPrice);
        ordersRepository.save(orders);
    }
}
