package com.buyte.member.controller;

import com.buyte.member.dto.CartReqDto;
import com.buyte.member.dto.CartResDto;
import com.buyte.member.service.CartServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;



@ExtendWith(MockitoExtension.class)
class CartControllerTest {

    @InjectMocks
    private CartController cartController;

    @Mock
    private CartServiceImpl cartService;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();
    }

    @Test
    @DisplayName("장바구니 조회")
    void getCartInfo() throws Exception {

        CartResDto.CartInfo cartInfo1 = CartResDto.CartInfo.builder()
                .cartId(1L)
                .productId(1L)
                .productName("Product 1")
                .productImagePath("image1.jpg")
                .productPrice(1000)
                .productCount(1)
                .build();

        CartResDto.CartInfo cartInfo2 = CartResDto.CartInfo.builder()
                .cartId(2L)
                .productId(2L)
                .productName("Product 2")
                .productImagePath("image2.jpg")
                .productPrice(2000)
                .productCount(1)
                .build();
        List<CartResDto.CartInfo> cartInfos = Arrays.asList(cartInfo1, cartInfo2);

        CartResDto.CartAllInfo expectedCartInfo = CartResDto.CartAllInfo.builder()
                .cartInfos(cartInfos)
                .totalPrice(3000)
                .build();

        given(cartService.getInfoMemberCart()).willReturn(expectedCartInfo);

        mockMvc.perform(get("/cart")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cartInfos[0].cartId").value(cartInfo1.getCartId()))
                .andExpect(jsonPath("$.cartInfos[0].productId").value(cartInfo1.getProductId()))
                .andExpect(jsonPath("$.cartInfos[0].productName").value(cartInfo1.getProductName()))
                .andExpect(jsonPath("$.cartInfos[0].productImagePath").value(cartInfo1.getProductImagePath()))
                .andExpect(jsonPath("$.cartInfos[0].productPrice").value(cartInfo1.getProductPrice()))
                .andExpect(jsonPath("$.cartInfos[0].productCount").value(cartInfo1.getProductCount()))
                .andExpect(jsonPath("$.cartInfos[1].cartId").value(cartInfo2.getCartId()))
                .andExpect(jsonPath("$.cartInfos[1].productId").value(cartInfo2.getProductId()))
                .andExpect(jsonPath("$.cartInfos[1].productName").value(cartInfo2.getProductName()))
                .andExpect(jsonPath("$.cartInfos[1].productImagePath").value(cartInfo2.getProductImagePath()))
                .andExpect(jsonPath("$.cartInfos[1].productPrice").value(cartInfo2.getProductPrice()))
                .andExpect(jsonPath("$.cartInfos[1].productCount").value(cartInfo2.getProductCount()))
                .andExpect(jsonPath("$.totalPrice").value(expectedCartInfo.getTotalPrice()))
                .andDo(print());

        verify(cartService).getInfoMemberCart();
    }

    @Test
    @DisplayName("장바구니 선택 물품 삭제")
    void deletePorducts() throws Exception {


        CartReqDto.CartIds cartIds = new CartReqDto.CartIds(Arrays.asList(1L,2L));

        doNothing().when(cartService).deleteSelectedProducts(any());

        mockMvc.perform(MockMvcRequestBuilders.delete("/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartIds)))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    @DisplayName("장바구니에 일반상품 추가")
    void addProduct() throws Exception {


        Long productId = 1L;

        doNothing().when(cartService).addProductToCart(productId);

        mockMvc.perform(MockMvcRequestBuilders.post("/store/{store_id}/{product_id}", 1L, productId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DisplayName("장바구니에 커스텀상품 추가")
    void addCustomProduct() throws Exception {


        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "Test Image".getBytes());
        Long productId = 1L;

        doNothing().when(cartService).addCustomProductToCart(file, productId);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/store/{store_id}/custom/{product_id}", 1, productId)
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DisplayName("상품 수량 변경")
    void updateProductCount() throws Exception {


        CartReqDto.CartProductCount cartProductCount = new CartReqDto.CartProductCount(1L, 5);
        CartResDto.PatchTotalPrcie patchTotalPrice = CartResDto.PatchTotalPrcie.builder()
                .totalPrice(10000)
                .build();

        when(cartService.updateProductCount(Mockito.any(CartReqDto.CartProductCount.class))).thenReturn(patchTotalPrice);

        mockMvc.perform(MockMvcRequestBuilders.patch("/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartProductCount)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice").value(10000));
    }

    @Test
    @DisplayName("선택된제품 결제페이지로 이동")
    void paymentPorducts() throws Exception {

        CartReqDto.CartIds cartIds = new CartReqDto.CartIds(Arrays.asList(1L, 2L));
        CartResDto.CartInfo cartInfo1 = CartResDto.CartInfo.builder()
                .cartId(1L)
                .productId(1L)
                .productName("Product 1")
                .productImagePath("image1.jpg")
                .productPrice(1000)
                .productCount(1)
                .build();

        CartResDto.CartInfo cartInfo2 = CartResDto.CartInfo.builder()
                .cartId(2L)
                .productId(2L)
                .productName("Product 2")
                .productImagePath("image2.jpg")
                .productPrice(2000)
                .productCount(1)
                .build();
        List<CartResDto.CartInfo> cartInfos = Arrays.asList(cartInfo1, cartInfo2);

        CartResDto.CartAllInfo expectedCartInfo = CartResDto.CartAllInfo.builder()
                .cartInfos(cartInfos)
                .totalPrice(3000)
                .build();

        when(cartService.paymentSelectedProduct(Mockito.any(CartReqDto.CartIds.class))).thenReturn(expectedCartInfo);

        mockMvc.perform(MockMvcRequestBuilders.post("/cart/payment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartIds)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cartInfos").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cartInfos.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPrice").value(3000))
                .andDo(print());
    }
}