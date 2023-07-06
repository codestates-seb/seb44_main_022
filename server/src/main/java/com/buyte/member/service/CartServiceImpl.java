package com.buyte.member.service;

import com.buyte.config.S3Service;
import com.buyte.member.dto.CartReqDto;
import com.buyte.member.dto.CartResDto;
import com.buyte.member.entity.Cart;
import com.buyte.member.entity.Member;
import com.buyte.member.mapper.CartMapper;
import com.buyte.member.repository.CartRepository;
import com.buyte.member.repository.MemberRepository;
import com.buyte.product.entity.Product;
import com.buyte.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService{

    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final S3Service s3Service;

    @Override
    public List<CartResDto> getInfoMemberCart(Long memberId) throws Exception {
        Member member = memberRepository.findById(memberId).orElseThrow();
        List<Cart> cartList = member.getCartList();
        List<CartResDto> cartResDtos = cartMapper.cartsToCartsResDtos(cartList);

        return cartResDtos;
    }

    @Override
    public void deleteSelectedProducts(CartReqDto.CartIds cartIds) throws Exception {
        cartRepository.deleteByCartIdIn(cartIds.getCartIds());
    }

    @Override
    public void addProductToCart(Long productId) throws Exception {
        Product product = productRepository.findById(productId).orElseThrow();
        Cart cart = new Cart(product, product.getProductImage(), product.getProductPrice());

        cartRepository.save(cart);

    }

    @Override
    public void addCustomProductToCart(MultipartFile file, Long productId) throws IOException {
        Product product = productRepository.findById(productId).orElseThrow();
        if(file.isEmpty()) {
            throw new IllegalArgumentException("파일이 존재하지 않습니다.");
        }
        String storedFileName = s3Service.upload(file, "customProduct");
        Cart cart = new Cart(product, storedFileName, product.getProductPrice());
        cartRepository.save(cart);
    }

    @Override
    public void updateProductCount(CartReqDto.CartProductCount cartProductCount) throws Exception {
        Cart cart = cartRepository.findById(cartProductCount.getCartId()).orElseThrow();
        cart.updateProductCount(cartProductCount.getCount());
        cartRepository.save(cart);
    }


}
