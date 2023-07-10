package com.buyte.product.entity;

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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name")
    @Enumerated(EnumType.STRING)
    private CategoryName categoryName;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Product> productList = new ArrayList<>();

    public enum CategoryName {
        CAKE,
        COOKIE,
        DONUT
    }
}
