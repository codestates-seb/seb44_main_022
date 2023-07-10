package com.buyte.product.dto;

import com.buyte.ingredient.dto.IngredientOriginDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDetailsDto {
    private long productId;
    private String productName;
    private Integer productPrice;
    private String productIntroduction;
    private String productImage;
    private List<IngredientOriginDto> ingredientOriginList;
}
