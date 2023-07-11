package com.buyte.ingredient.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IngredientInfoDto {

    private String ingredientName;
    private String ingredientImage;
    private Integer ingredientPrice;
}
