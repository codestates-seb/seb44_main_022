package com.buyte.ingredient.mapper;

import com.buyte.ingredient.dto.IngredientInfoDto;
import com.buyte.ingredient.dto.IngredientOriginDto;
import com.buyte.ingredient.entity.Ingredient;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IngredientMapper {

    default IngredientOriginDto ingredientToIngredientOrigin(Ingredient ingredient) {
        return IngredientOriginDto.builder()
            .ingredientId(ingredient.getIngredientId())
            .ingredientName(ingredient.getIngredientName())
            .ingredientOrigin(ingredient.getIngredientOrigin())
            .build();
    }

    default IngredientInfoDto ingredientToIngredientInfo(Ingredient ingredient) {
        return IngredientInfoDto.builder()
            .ingredientImage(ingredient.getIngredientImage())
            .ingredientName(ingredient.getIngredientName())
            .ingredientPrice(ingredient.getIngredientPrice())
            .build();
    }
}
