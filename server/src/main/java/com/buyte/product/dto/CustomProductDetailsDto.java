package com.buyte.product.dto;

import com.buyte.ingredient.dto.IngredientInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomProductDetailsDto {
    private List<IngredientInfoDto> baseIngredientList;
    private List<IngredientInfoDto> creamIngredientList;
    private List<IngredientInfoDto> toppingIngredientList;
    private List<IngredientInfoDto> fillingIngredientList;
}
