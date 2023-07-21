package com.buyte.store.entity;

import com.buyte.audit.Auditable;
import com.buyte.member.entity.Member;
import com.buyte.product.entity.Product;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
public class Store extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId;

    @ManyToOne
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

    @Column(name = "store_phone_number")
    private String storePhoneNumber;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Product> productList = new ArrayList<>();
}
