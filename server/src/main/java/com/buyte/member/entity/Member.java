package com.buyte.member.entity;

import com.buyte.order.entity.Orders;
import com.buyte.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false, unique = true)
    private Long memberId;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "member_name", nullable = false)
    private String memberName;

//    @Column(name = "email", nullable = false)
//    private String email;

    @OneToOne(mappedBy = "member", cascade = {CascadeType.ALL})
    private Store store;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Cart> cartList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Orders> orderList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "member_type")
    private MemberType memberType;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role")
    private MemberRole memberRole;

    public enum MemberType {
        BASIC,
        GOOGLE
    }

    public enum MemberRole {
        CUSTOMER,
        SELLER,
        ADMIN;
    }

    public static void checkExistLoginId(Member member){
        if(member != null) {
            throw new RuntimeException("Member exists");
        }
    }
}
