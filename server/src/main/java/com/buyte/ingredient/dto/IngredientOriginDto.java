package com.buyte.ingredient.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IngredientOriginDto {
    private long ingredientId;
    private String ingredientName;
    private String ingredientOrigin;
}
