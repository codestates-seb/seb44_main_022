package com.buyte.order.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.utils.SecurityUtil;
import com.buyte.member.entity.Cart;
import com.buyte.member.entity.Member;
import com.buyte.member.repository.CartRepository;
import com.buyte.member.repository.MemberRepository;
import com.buyte.order.dto.OrderDto;
import com.buyte.order.entity.OrderProduct;
import com.buyte.order.entity.Orders;
import com.buyte.order.repository.OrderProductRepository;
import com.buyte.order.repository.OrdersRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import javax.transaction.Transactional;
import java.io.*;
import java.net.URL;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrdersServiceImpl implements OrdersService{

    private final MemberRepository memberRepository;
    private final OrdersRepository ordersRepository;
    private final OrderProductRepository orderProductRepository;
    private final CartRepository cartRepository;

    @Value("${portone.impkey}")
    private String impKey;

    @Value("${portone.impsecret}")
    private String impSecret;

    @Data
    private class Response{
        private PaymentInfo response;
    }

    @Data
    private class PaymentInfo{
        private int amount;
    }

    @Override
    public ResponseEntity<String> verifyOrder(OrderDto.OrderInfo orderInfo) throws Exception {

        String token = getToken();
        log.info("토큰: {}",token);

        int amount = paymentInfo(orderInfo.getImpUid(), token);
        log.info("결제금액: {}",amount);

        try {
            List<Long> cartIds = orderInfo.getCartIds();
            List<Cart> cartList = cartRepository.findAllByCartIdIn(cartIds);
            Integer totalPrice = 0;
            for (Cart cart : cartList) {
                totalPrice += cart.getProduct().getProductPrice() * cart.getProductCount();
            }

            if (totalPrice + 3500 != amount) {
                log.info("결제금액 이상");
                log.info("예상 결제금액: {}", totalPrice + 3500);
                payMentCancle(token, orderInfo.getImpUid(), amount, "결제 금액 오류");
                return new ResponseEntity<String>("결제 금액 오류, 결제 취소", HttpStatus.BAD_REQUEST);
            }

            Long authenticatedMemberId = SecurityUtil.getLoginMemberId();
            Member member = memberRepository.findById(authenticatedMemberId)
                    .orElseThrow(()-> new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_EXPIRED));
            Orders orders = new Orders(member);
            Long totalOrderPrice = 0L;
            ordersRepository.save(orders);

            for (Long cartId : cartIds) {
                Cart cart = cartRepository.findById(cartId)
                        .orElseThrow(()-> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
                OrderProduct orderProduct = new OrderProduct(cart.getProduct(), cart.getCartCustomProductImage(), cart.getProductCount());
                orderProduct.setOrder(orders);
                orderProductRepository.save(orderProduct);
                cartRepository.delete(cart);
                totalOrderPrice += (long) cart.getProduct().getProductPrice() * cart.getProductCount();
            }
            orders.setOrder(totalOrderPrice +3500, orderInfo.getAddress());
            ordersRepository.save(orders);

            log.info("주문 완료");
            return new ResponseEntity<>("주문이 완료되었습니다", HttpStatus.OK);

        } catch (Exception e) {
            log.info("결제 에러");
            payMentCancle(token, orderInfo.getImpUid(), amount, "결제 에러");
            return new ResponseEntity<String>("결제 에러", HttpStatus.BAD_REQUEST);
        }
    }

    public String getToken() throws IOException, IOException {

        HttpsURLConnection conn = null;

        URL url = new URL("https://api.iamport.kr/users/getToken");

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        JsonObject json = new JsonObject();

        json.addProperty("imp_key", impKey);
        json.addProperty("imp_secret", impSecret);

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        Gson gson = new Gson();

        String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
        String token = gson.fromJson(response, Map.class).get("access_token").toString();

        br.close();
        conn.disconnect();

        return token;
    }

    public int paymentInfo(String imp_uid, String access_token) throws IOException {

        HttpsURLConnection conn = null;

        URL url = new URL("https://api.iamport.kr/payments/" + imp_uid);

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", access_token);
        conn.setDoOutput(true);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        Gson gson = new Gson();

        Response response = gson.fromJson(br.readLine(), Response.class);

        br.close();
        conn.disconnect();

        return response.getResponse().getAmount();
    }

    public void payMentCancle(String access_token, String imp_uid, int amount, String reason) throws IOException  {

        log.info("결제 취소");
        log.info("access_token: {}",access_token);
        log.info("imp_uid: {}", imp_uid);

        HttpsURLConnection conn = null;
        URL url = new URL("https://api.iamport.kr/payments/cancel");

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");

        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Authorization", access_token);
        conn.setDoOutput(true);

        JsonObject json = new JsonObject();

        json.addProperty("reason", reason);
        json.addProperty("imp_uid", imp_uid);
        json.addProperty("amount", amount);
        json.addProperty("checksum", amount);

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        br.close();
        conn.disconnect();
    }
}
