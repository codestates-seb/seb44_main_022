package com.buyte.store.entity;

import com.buyte.member.entity.Member;
import com.buyte.product.entity.Product;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "store_address")
    private String storeAddress;

    @Column(name = "store_latitude")
    private Double storeLatitude;

    @Column(name = "store_longitude")
    private Double storeLongitude;

    @Column(name = "store_introduction")
    private String storeIntroduction;

    @Column(name = "store_image")
    private String storeImage;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Product> productList = new ArrayList<>();
}
