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

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_introduction")
    private String productIntroduction;

    @Column(name = "product_image")
    private String productImage;

    @Column(name = "product_favor")
    @Enumerated(EnumType.STRING)
    private ProductFavor productFavor;

    @Column(name = "product_generic")
    @Enumerated(EnumType.STRING)
    private ProductGeneric productGeneric;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<ProductIngerdient> productIngerdientList = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Cart> cartList = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<OrderProduct> orderProductList = new ArrayList<>();

    public enum ProductFavor {
        FAVOR,
        DISFAVOR
    }

    public enum ProductGeneric {
        CUSTOM,
        STANDARD
    }
}
