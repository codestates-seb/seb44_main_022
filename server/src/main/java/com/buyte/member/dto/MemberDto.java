package com.buyte.member.dto;

import com.buyte.dto.PageInfoDto;
import com.buyte.order.entity.Orders;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank(message = "아이디를 입력해주세요.")
        @Pattern(regexp = "^[a-zA-Z0-9]{4,12}$",
                message = "아이디는 4~12 자리면이면서 한글, 영어, 숫자만 포함되어야 합니다.")
        private String loginId;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_\\-+=])[a-zA-Z\\d!@#$%^&*()_\\-+=]{8,16}$",
                message = "비밀번호는 8~16 자리이면서 1개 이상의 알파벳, 숫자, 특수문자가 포함되어야합니다.")
        private String password;

        @NotBlank(message = "닉네임을 입력해주세요.")
        private String memberName;

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        private long memberId;
        @Nullable
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_\\-+=])[a-zA-Z\\d!@#$%^&*()_\\-+=]{8,16}$",
                message = "비밀번호는 8~16 자리이면서 1개 이상의 알파벳, 숫자, 특수문자가 포함되어야합니다.")
        private String password;
        @Nullable
        private String memberName;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String memberName;
    }

    @Builder
    @Getter
    public static class OrderResponse {
        private List<OrderInfo> orderInfos;
        private PageInfoDto pageInfo;
    }

    @Builder
    @Getter
    @Setter
    public static class OrderInfo {
        private Long orderId;
        private Integer orderCount;
        private LocalDateTime createdAt;
        private Long totalPrice;
        private Orders.OrderState orderStatus;
        private String orderAddress;
        private List<OrderProductInfo> orderProductInfos;
    }

    @Builder
    @Getter
    public static class OrderProductInfo {
        private Long orderProductId;
        private long productId;
        private String productName;
        private Integer productPrice;
        private String productImage;
        private Integer productCount;
        private Long storeId;
    }
}
