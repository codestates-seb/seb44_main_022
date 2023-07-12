package com.buyte.ingredient.entity;

import com.buyte.product.entity.ProductIngerdient;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId;

    @Column(name = "ingredient_name")
    private String ingredientName;

    @Column(name = "ingredient_price")
    private Integer ingredientPrice;

    @Column(name = "ingredient_image")
    private String ingredientImage;

    @Column(name = "ingredient_count")
    private Integer ingredientCount;

    @Column(name = "ingredient_category")
    @Enumerated(EnumType.STRING)
    private IngredientCategory ingredientCategory;

    @Column(name = "ingredient_origin")
    private String ingredientOrigin;

    @OneToMany(mappedBy = "ingredient", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<ProductIngerdient> productIngerdientList = new ArrayList<>();

    public enum IngredientCategory {
        CAKE_BASE,
        COOKIE_BASE,
        DONUT_BASE,
        CREAM,
        TOPPING,
        FILLING
    }
}
