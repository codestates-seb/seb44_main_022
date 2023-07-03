package com.buyte.member.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Member {

    @Id
    private Long memberId;

    private String email;

    private String password;

    private String memberName;


}
