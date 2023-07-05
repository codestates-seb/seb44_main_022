package com.buyte.restdocs.store;

import static com.buyte.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.buyte.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.buyte.member.entity.Member;
import com.buyte.member.entity.Member.MemberRole;
import com.buyte.member.entity.Member.MemberType;
import com.buyte.product.dto.ProductDto;
import com.buyte.product.entity.Category;
import com.buyte.product.entity.Category.CategoryName;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.ProductFavor;
import com.buyte.product.entity.Product.ProductGeneric;
import com.buyte.store.controller.StoreController;
import com.buyte.store.dto.StoreDto;
import com.buyte.store.dto.StoreDto.Response;
import com.buyte.store.entity.Store;
import com.buyte.store.service.StoreService;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(StoreController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class StoreControllerRestDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StoreService storeService;

    @Autowired
    private Gson gson;

    @Test
    public void getStoreDetailsTest() throws Exception {

        long memberId = 1L;
        Member member = new Member();
        member.setMemberId(memberId);
        member.setEmail("temp1234@gmail.com");
        member.setMemberName("이준기");
        member.setMemberRole(MemberRole.SELLER);
        member.setMemberType(MemberType.BASIC);
        member.setPassword("1q2w3e4r!");

        long storeId = 1L;
        Store store = new Store();
        store.setStoreId(storeId);
        store.setStoreAddress("서울 강남구 도산대로53길 15");
        store.setStoreImage("/images/store/1");
        store.setStoreIntroduction("영업시간09:00 ~ 21:00" + "Last order - 20:30");
        store.setStoreLatitude(37.525789);
        store.setStoreLongitude(127.028394);
        store.setStoreName("노티드 청담점");
        store.setMember(member);

        long categoryId = 1L;
        Category category = new Category();
        category.setCategoryId(categoryId);
        category.setCategoryName(CategoryName.CAKE);

        long productId = 1L;
        Product product = new Product();
        product.setProductId(productId);
        product.setStore(store);
        product.setCategory(category);
        product.setProductName("딸기 케이크");
        product.setProductPrice(22000);
        product.setProductIntroduction("딸기 케이크");
        product.setProductImage("/images/store-1/1");
        product.setProductFavor(ProductFavor.FAVOR);
        product.setProductGeneric(ProductGeneric.STANDARD);

        ProductDto.Response productResponseDto = new ProductDto.Response();
        productResponseDto.setProductId(product.getProductId());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setProductImage(product.getProductImage());
        productResponseDto.setProductPrice(product.getProductPrice());

        List<ProductDto.Response> productResponseDtoList = new ArrayList<>();
        productResponseDtoList.add(productResponseDto);

        StoreDto.Response storeResponseDto = new Response();
        storeResponseDto.setMemberId(memberId);
        storeResponseDto.setStoreAddress(store.getStoreAddress());
        storeResponseDto.setStoreName(store.getStoreName());
        storeResponseDto.setStoreintroduction(store.getStoreIntroduction());
        storeResponseDto.setStoreImage(store.getStoreImage());
        storeResponseDto.setProductList(productResponseDtoList);

        given(storeService.getStoreDetails(Mockito.anyLong())).willReturn(storeResponseDto);

        ResultActions actions =
            mockMvc.perform(
                get("/v1/store/{store-id}", storeId)
                    .accept(MediaType.APPLICATION_JSON)
                    .contentType(MediaType.APPLICATION_JSON)
            );

        actions
            .andExpect(status().isOk())
            .andDo(document("get-store-details",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                    parameterWithName("store-id").description("가게 식별자")
                ),
                responseFields(
                    List.of(
                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                        fieldWithPath("storeName").type(JsonFieldType.STRING).description("가게명"),
                        fieldWithPath("storeAddress").type(JsonFieldType.STRING)
                            .description("가게 주소"),
                        fieldWithPath("storeIntroduction").type(JsonFieldType.STRING)
                            .description("가게 소개"),
                        fieldWithPath("storeImage").type(JsonFieldType.STRING)
                            .description("가게 이미지"),
                        fieldWithPath("productList").type(JsonFieldType.ARRAY)
                            .description("제품 리스트"),
                        fieldWithPath("productList[].productId").type(JsonFieldType.NUMBER)
                            .description("제품 식별자"),
                        fieldWithPath("productList[].productName").type(JsonFieldType.STRING)
                            .description("제품명"),
                        fieldWithPath("productList[].productImage").type(JsonFieldType.STRING)
                            .description("제품 이미지"),
                        fieldWithPath("productList[].productPrice").type(JsonFieldType.NUMBER)
                            .description("제품 가격")
                    )
                )
            ));
    }
}


