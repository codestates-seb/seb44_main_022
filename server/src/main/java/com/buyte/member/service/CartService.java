package com.buyte.member.service;

import com.buyte.member.dto.CartResDto;

import java.util.List;

public interface CartService {

    List<CartResDto> getInfoMemberCart(Long memberId) throws Exception;
}