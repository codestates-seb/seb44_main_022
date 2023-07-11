package com.buyte.product.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.ingredient.dto.IngredientInfoDto;
import com.buyte.ingredient.dto.IngredientOriginDto;
import com.buyte.ingredient.entity.Ingredient;
import com.buyte.ingredient.entity.Ingredient.IngredientCategory;
import com.buyte.ingredient.mapper.IngredientMapper;
import com.buyte.product.dto.CustomProductDetailsDto;
import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.dto.ProductDetailsDto;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import com.buyte.product.entity.Product.ProductType;
import com.buyte.product.entity.ProductIngerdient;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.product.repository.ProductIngredientRepository;
import com.buyte.product.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductIngredientRepository productIngredientRepository;
    private final ProductMapper productMapper;
    private final IngredientMapper ingredientMapper;

    @Transactional(readOnly = true)
    public PreferenceProductPageDto getPreferenceProducts(int page) {

        Pageable pageable = PageRequest.of(page, 20, Sort.by("createdAt").descending());

        Page<Product> findProductPage = productRepository.findByPreferenceProduct(
            PreferenceProduct.PREFERRED, pageable);

        List<PreferenceProductDto> preferenceProductList = findProductPage.getContent().stream()
            .map(product -> productMapper.productToPreferenceProduct(product))
            .collect(Collectors.toList());

        PreferenceProductPageDto preferenceProductPageDto = productMapper.productPageToPreferenceProductPage(
            findProductPage);

        preferenceProductPageDto.setPreferenceProductList(preferenceProductList);

        return preferenceProductPageDto;
    }

    @Transactional(readOnly = true)
    public ProductDetailsDto getProductDetails(long storeId, long productId) {

        Product findProduct = findVerifiedProduct(productId);

        if (findProduct.getStore().getStoreId() != storeId) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        if (findProduct.getProductType() == ProductType.CUSTOM) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_TYPE_CUSTOM_FORBIDDEN);
        }

        log.info("# storeId : {} findStoreId : {}", storeId, findProduct.getStore().getStoreId());

        List<IngredientOriginDto> ingredientOriginList = findProduct.getProductIngerdientList()
            .stream()
            .map(productIngerdient -> ingredientMapper.ingredientToIngredientOrigin(
                productIngerdient.getIngredient()))
            .collect(Collectors.toList());

        ProductDetailsDto productDetailsDto = productMapper.productToProductDetails(
            findProduct);
        productDetailsDto.setIngredientOriginList(ingredientOriginList);

        return productDetailsDto;
    }

    @Transactional(readOnly = true)
    public CustomProductDetailsDto getCustomProductDetails(long storeId, long productId) {

        Product findProduct = findVerifiedProduct(productId);

        if (findProduct.getStore().getStoreId() != storeId) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        if (findProduct.getProductType() == ProductType.STANDARD) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_TYPE_STANDARD_FORBIDDEN);
        }

        List<IngredientInfoDto> baseIngredientList = new ArrayList<>();
        List<IngredientInfoDto> creamIngredientList = new ArrayList<>();
        List<IngredientInfoDto> toppingIngredientList = new ArrayList<>();
        List<IngredientInfoDto> fillingIngredientList = new ArrayList<>();

        List<ProductIngerdient> productIngerdientList = productIngredientRepository.findByProduct(
            findProduct);

        productIngerdientList.forEach(productIngerdient -> {

                Ingredient ingredient = productIngerdient.getIngredient();
                IngredientCategory ingredientCategory = ingredient.getIngredientCategory();

                IngredientInfoDto ingredientDto = ingredientMapper.ingredientToIngredientInfo(
                    ingredient);
                if (ingredientCategory == IngredientCategory.CREAM) {
                    creamIngredientList.add(ingredientDto);
                } else if (ingredientCategory == IngredientCategory.FILLING) {
                    fillingIngredientList.add(ingredientDto);
                } else if (ingredientCategory == IngredientCategory.TOPPING) {
                    toppingIngredientList.add(ingredientDto);
                } else {
                    baseIngredientList.add(ingredientDto);
                }
            }
        );

        return CustomProductDetailsDto.builder()
            .baseIngredientList(baseIngredientList)
            .creamIngredientList(creamIngredientList)
            .toppingIngredientList(toppingIngredientList)
            .fillingIngredientList(fillingIngredientList)
            .build();
    }

    @Transactional(readOnly = true)
    public Product findVerifiedProduct(long productId) {

        return productRepository.findById(productId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }
}
