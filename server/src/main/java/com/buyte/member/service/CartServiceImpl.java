package com.buyte.member.service;

import com.buyte.member.dto.CartResDto;
import com.buyte.member.entity.Cart;
import com.buyte.member.entity.Member;
import com.buyte.member.mapper.CartMapper;
import com.buyte.member.repository.CartRepository;
import com.buyte.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService{

    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;

    @Override
    public List<CartResDto> getInfoMemberCart(Long memberId) throws Exception {
        Member member = memberRepository.findById(memberId).orElseThrow();
        List<Cart> cartList = member.getCartList();
        List<CartResDto> cartResDtos = cartMapper.cartsToCartsResDtos(cartList);

        return cartResDtos;
    }

    @Override
    public void deleteSelectedProducts(List<Long> cartIds) throws Exception {
        cartRepository.deleteByCartIdIn(cartIds);
    }
}
