package com.buyte.member.dto;

import lombok.Getter;

import java.util.List;


@Getter
public class CartReqDto {

    private List<Long> cartIds;
}
