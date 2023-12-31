package com.buyte.product.entity;

import com.buyte.audit.Auditable;
import com.buyte.member.entity.Cart;
import com.buyte.order.entity.OrderProduct;
import com.buyte.store.entity.Store;
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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_introduction")
    private String productIntroduction;

    @Column(name = "product_image")
    private String productImage;

    @Column(name = "product_category")
    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;

    @Column(name = "product_preference")
    @Enumerated(EnumType.STRING)
    private PreferenceProduct preferenceProduct;

    @Column(name = "product_type")
    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<ProductIngerdient> productIngerdientList = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Cart> cartList = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderProduct> orderProductList = new ArrayList<>();

    public enum PreferenceProduct {
        PREFERRED,
        NOT_PREFERRED
    }

    public enum ProductType {
        CUSTOM,
        STANDARD
    }

    public enum ProductCategory {
        CAKE,
        COOKIE,
        DONUT
    }
}
