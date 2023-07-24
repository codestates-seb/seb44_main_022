//package com.buyte.restdocs.store;
//
//import static com.buyte.util.ApiDocumentUtils.getRequestPreProcessor;
//import static com.buyte.util.ApiDocumentUtils.getResponsePreProcessor;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import com.buyte.member.entity.Member;
//import com.buyte.member.entity.Member.MemberRole;
//import com.buyte.member.entity.Member.MemberType;
//import com.buyte.product.dto.ProductInfoDto;
//import com.buyte.product.entity.Category;
//import com.buyte.product.entity.Category.CategoryName;
//import com.buyte.product.entity.Product;
//import com.buyte.product.entity.Product.PreferenceProduct;
//import com.buyte.product.entity.Product.ProductType;
//import com.buyte.store.controller.StoreController;
//import com.buyte.store.dto.StoreDetailsDto;
//import com.buyte.store.entity.Store;
//import java.util.ArrayList;
//import java.util.List;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//
//@WebMvcTest(StoreController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class StoreControllerRestDocsTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private StoreService storeService;
//
//    @Test
//    public void getStoreDetailsTest() throws Exception {
//        // Mock 데이터 설정
//        long memberId = 1L;
//        Member member = createMockMember(memberId);
//        long storeId = 1L;
//        Store store = createMockStore(storeId, member);
//        long categoryId = 1L;
//        Category category = createMockCategory(categoryId);
//        long productId = 1L;
//        Product product = createMockProduct(productId, store, category);
//
//        // Mock 서비스 응답 설정
//        StoreDetailsDto storeDetailsDto = createMockStoreDetailsDto(member, store, product);
//        given(storeService.getStoreDetails(Mockito.anyLong())).willReturn(storeDetailsDto);
//
//        // API 호출 및 테스트
//        mockMvc.perform(
//                get("/v1/store/{store-id}", storeId)
//                    .accept(MediaType.APPLICATION_JSON)
//                    .contentType(MediaType.APPLICATION_JSON)
//            )
//            .andExpect(status().isOk())
//            .andDo(document("get-store-details",
//                getRequestPreProcessor(),
//                getResponsePreProcessor(),
//                pathParameters(
//                    parameterWithName("store-id").description("가게 식별자")
//                ),
//                responseFields(
//                    fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                    fieldWithPath("storeName").type(JsonFieldType.STRING).description("가게명"),
//                    fieldWithPath("storeAddress").type(JsonFieldType.STRING).description("가게 주소"),
//                    fieldWithPath("storeIntroduction").type(JsonFieldType.STRING)
//                        .description("가게 소개"),
//                    fieldWithPath("storeImage").type(JsonFieldType.STRING).description("가게 이미지"),
//                    fieldWithPath("productInfoList").type(JsonFieldType.ARRAY)
//                        .description("제품 리스트"),
//                    fieldWithPath("productInfoList[].productId").type(JsonFieldType.NUMBER)
//                        .description("제품 식별자"),
//                    fieldWithPath("productInfoList[].productName").type(JsonFieldType.STRING)
//                        .description("제품명"),
//                    fieldWithPath("productInfoList[].productImage").type(JsonFieldType.STRING)
//                        .description("제품 이미지"),
//                    fieldWithPath("productInfoList[].productPrice").type(JsonFieldType.NUMBER)
//                        .description("제품 가격"),
//                    fieldWithPath("productInfoList[].productType").type(JsonFieldType.STRING)
//                        .description("제품 유형")
//                )
//            ));
//    }
//
//    private Member createMockMember(long memberId) {
//        Member member = new Member();
//        member.setMemberId(memberId);
//        member.setLoginId("temp1234");
//        member.setMemberName("이준기");
//        member.setMemberRole(MemberRole.SELLER);
//        member.setMemberType(MemberType.BASIC);
//        member.setPassword("1q2w3e4r!");
//        return member;
//    }
//
//    private Store createMockStore(long storeId, Member member) {
//        Store store = new Store();
//        store.setStoreId(storeId);
//        store.setStoreAddress("서울 강남구 도산대로53길 15");
//        store.setStoreImage("/images/store/1");
//        store.setStoreIntroduction("영업시간09:00 ~ 21:00" + "Last order - 20:30");
//        store.setStoreLatitude(37.525789);
//        store.setStoreLongitude(127.028394);
//        store.setStoreName("노티드 청담점");
//        store.setMember(member);
//        return store;
//    }
//
//    private Category createMockCategory(long categoryId) {
//        Category category = new Category();
//        category.setCategoryId(categoryId);
//        category.setCategoryName(CategoryName.CAKE);
//        return category;
//    }
//
//    private Product createMockProduct(long productId, Store store, Category category) {
//        Product product = new Product();
//        product.setProductId(productId);
//        product.setStore(store);
//        product.setCategory(category);
//        product.setProductName("딸기 케이크");
//        product.setProductPrice(22000);
//        product.setProductIntroduction("딸기 케이크");
//        product.setProductImage("/images/store-1/1");
//        product.setProductType(ProductType.STANDARD);
//        product.setPreferenceProduct(PreferenceProduct.PREFERRED);
//        return product;
//    }
//
//    private StoreDetailsDto createMockStoreDetailsDto(Member member, Store store, Product product) {
//        ProductInfoDto productInfoDto = ProductInfoDto.builder()
//            .productId(product.getProductId())
//            .productImage(product.getProductImage())
//            .productName(product.getProductName())
//            .productPrice(product.getProductPrice())
//            .productType(product.getProductType())
//            .build();
//
//        List<ProductInfoDto> productInfoDtoList = new ArrayList<>();
//        productInfoDtoList.add(productInfoDto);
//
//        return StoreDetailsDto.builder()
//            .memberId(member.getMemberId())
//            .storeName(store.getStoreName())
//            .storeAddress(store.getStoreAddress())
//            .storeIntroduction(store.getStoreIntroduction())
//            .storeImage(store.getStoreImage())
//            .productInfoList(productInfoDtoList)
//            .build();
//    }
//}