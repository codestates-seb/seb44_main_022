package com.buyte.order.entity;

import com.buyte.product.entity.Product;
import lombok.AccessLevel;
import lombok.Builder;
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
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_id")
    private Long orderProductId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "order_product_custom_product_image")
    private String orderProductCustomProductImage;

    @Column(name = "order_product_custom_product_count")
    private Integer orderProductCustomProductCount;

    public OrderProduct(Product product, String orderProductCustomProductImage, Integer orderProductCustomProductCount){
        this.product = product;
        this.orderProductCustomProductImage = orderProductCustomProductImage;
        this.orderProductCustomProductCount = orderProductCustomProductCount;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }
}
