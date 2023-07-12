package com.buyte.member.entity;

import com.buyte.product.entity.Product;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "cart_custom_product_image")
    private String cartCustomProductImage;

    @Column(name = "product_count")
    private Integer productCount;

    public Cart( Product product, String cartCustomProductImage, Member member) {

        this.product = product;
        this.cartCustomProductImage = cartCustomProductImage;
        this.member = member;
        this.productCount = 1;
    }

    public void updateProductCount(Integer productCount) {
        this.productCount = productCount;
    }
}
