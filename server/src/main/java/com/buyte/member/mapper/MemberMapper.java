package com.buyte.member.mapper;

import com.buyte.dto.PageInfoDto;
import com.buyte.member.dto.MemberDto;
import com.buyte.member.entity.Member;
import com.buyte.order.entity.OrderProduct;
import com.buyte.order.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchToMember(MemberDto.Patch memberPatchDto);

    MemberDto.Response memberToMemberResponseDto(Member member);

    default MemberDto.OrderResponse ordersToOrderResponse(List<Orders> orders, int page, int size) {
        int totalElement = orders.size();
        int totalPage = (totalElement + size - 1) / size;

        List<Orders> paginatedOrders = orders.stream()
                .sorted(Comparator.comparing(Orders::getOrderId).reversed())
                .skip((page - 1) * size)
                .limit(size)
                .collect(Collectors.toList());

        List<MemberDto.OrderInfo> orderInfos = paginatedOrders.stream()
                .map(this::orderToOrderInfo)
                .collect(Collectors.toList());

        PageInfoDto pageInfo = PageInfoDto.builder()
                .page(page)
                .size(size)
                .totalElement(totalElement)
                .totalPage(totalPage).build();

        return MemberDto.OrderResponse.builder()
                .orderInfos(orderInfos)
                .pageInfo(pageInfo)
                .build();
    }

    default MemberDto.OrderInfo orderToOrderInfo(Orders order) {

        if (order == null) {
            return null;
        }

        return MemberDto.OrderInfo.builder()
                .orderId(order.getOrderId())
                .createdAt(order.getCreatedAt())
                .totalPrice(order.getOrderPrice())
                .orderStatus(order.getOrderState())
                .orderAddress(order.getOrderAddress())
                .orderProductInfos(orderProductToOrderProductInfo(order.getOrderProductList()))
                .build();
    }

    default List<MemberDto.OrderProductInfo> orderProductToOrderProductInfo(List<OrderProduct> orderProduct) {
        if (orderProduct == null) {
            return null;
        }

        List<MemberDto.OrderProductInfo> list = new ArrayList<>(orderProduct.size());
        for (OrderProduct orderProduct1 : orderProduct) {
            list.add(MemberDto.OrderProductInfo.builder()
                    .orderProductId(orderProduct1.getOrderProductId())
                    .productId(orderProduct1.getProduct().getProductId())
                    .productName(orderProduct1.getProduct().getProductName())
                    .productPrice(orderProduct1.getProduct().getProductPrice())
                    .productImage(orderProduct1.getOrderProductCustomProductImage())
                    .productCount(orderProduct1.getOrderProductCustomProductCount())
                    .storeId(orderProduct1.getProduct().getStore().getStoreId())
                    .build());
        }

        return list;
    }
}
