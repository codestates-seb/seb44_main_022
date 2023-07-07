package com.buyte.product.service;

import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.ingredient.dto.AllergyIngredientDto;
import com.buyte.ingredient.dto.IngredientOriginDto;
import com.buyte.ingredient.entity.Ingredient.AllergyIngredient;
import com.buyte.ingredient.mapper.IngredientMapper;
import com.buyte.product.dto.PreferenceProductDto;
import com.buyte.product.dto.PreferenceProductPageDto;
import com.buyte.product.dto.ProductDetailsDto;
import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import com.buyte.product.mapper.ProductMapper;
import com.buyte.product.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final IngredientMapper ingredientMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper,
        IngredientMapper ingredientMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.ingredientMapper = ingredientMapper;
    }

    @Transactional(readOnly = true)
    public PreferenceProductPageDto getPreferenceProducts(int page) {

        Pageable pageable = PageRequest.of(page, 20, Sort.by("createdAt").descending());

        Page<Product> findProductPage = productRepository.findByPreferenceProduct(PreferenceProduct.PREFERRED, pageable);

        List<PreferenceProductDto> preferenceProductList = findProductPage.getContent().stream()
            .map(product -> productMapper.productToPreferenceProduct(product))
            .collect(Collectors.toList());

        PreferenceProductPageDto preferenceProductPageDto = productMapper.productPageToPreferenceProductPage(findProductPage);

        preferenceProductPageDto.setPreferenceProductList(preferenceProductList);

        return preferenceProductPageDto;
    }

    @Transactional(readOnly = true)
    public ProductDetailsDto getProductDetails(long productId) {
        Product findProduct = findProduct(productId);

        List<IngredientOriginDto> ingredientOriginList = findProduct.getProductIngerdientList().stream()
            .map(productIngerdient -> productIngerdient.getIngredient())
            .map(ingredient -> ingredientMapper.ingredientToIngredientOrigin(ingredient))
            .collect(Collectors.toList());

        List<AllergyIngredientDto> allergyIngredientList = findProduct.getProductIngerdientList().stream()
            .map(productIngerdient -> productIngerdient.getIngredient())
            .filter(ingredient -> ingredient.getAllergyIngredient() == AllergyIngredient.ALLERGIC)
            .map(ingredient -> ingredientMapper.ingredientToAllergyIngredient(ingredient))
            .collect(Collectors.toList());

        ProductDetailsDto productDetailsDto = productMapper.productToProductDetails(findProduct);
        productDetailsDto.setIngredientOriginList(ingredientOriginList);
        productDetailsDto.setAllergyIngredientList(allergyIngredientList);

        return productDetailsDto;
    }

    @Transactional(readOnly = true)
    public Product findProduct(long productId) {
        return findVerifiedProduct(productId);
    }

    @Transactional(readOnly = true)
    public Product findVerifiedProduct(long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product findProduct = optionalProduct.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        return findProduct;
    }
}
