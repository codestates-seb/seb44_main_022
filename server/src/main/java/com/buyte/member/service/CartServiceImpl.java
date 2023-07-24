package com.buyte.member.service;

import com.buyte.config.S3Service;
import com.buyte.exception.BusinessLogicException;
import com.buyte.exception.ExceptionCode;
import com.buyte.member.auth.utils.SecurityUtil;
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
import java.util.Optional;

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
    public CartResDto.CartAllInfo getInfoMemberCart() throws Exception {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        List<Cart> cartList = cartRepository.findAllByMemberMemberId(authenticatedMemberId);
        Integer totalPrice = getTotalPrice(cartList);

        return getCartAllInfo(cartList, totalPrice);
    }

    @Override
    public void deleteSelectedProducts(CartReqDto.CartIds cartIds)  {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        List<Cart> cartList = cartRepository.findAllByCartIdIn(cartIds.getCartIds());
        for (Cart cart : cartList) {
            if (cart.getMember().getMemberId() != authenticatedMemberId) {
                throw new IllegalArgumentException("카트 아이디가 현재 사용자의 것이 아닙니다.");
            }
        }

        for (Cart cart : cartList) {
            String imageFilePath = cart.getCartCustomProductImage();
            if (imageFilePath != null) {
                String fileName = imageFilePath.substring(imageFilePath.lastIndexOf("/") + 1);
                try {
                    s3Service.deleteFile(fileName);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        cartRepository.deleteByCartIdInaAndMemberMemberId(cartIds.getCartIds(),authenticatedMemberId);
    }

    @Override
    public void addProductToCart(Long productId) {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Member member = memberRepository.findById(authenticatedMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        Cart cart = cartRepository.findByMemberAndProduct(member, product);
        if (cart != null) {
            cart.setProductCount(cart.getProductCount() + 1);
        } else {
            cart = new Cart(product, product.getProductImage(), member);
        }

        cartRepository.save(cart);

    }

    @Override
    public void addCustomProductToCart(MultipartFile file, Long productId) throws IOException {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Member member = memberRepository.findById(authenticatedMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        if(file.isEmpty()) {
            throw new IllegalArgumentException("파일이 존재하지 않습니다.");
        }
        String storedFileName = s3Service.upload(file, "customProduct");
        Cart cart = new Cart(product, storedFileName,member);
        cartRepository.save(cart);
    }

    @Override
    public CartResDto.PatchTotalPrcie updateProductCount(CartReqDto.CartProductCount cartProductCount) {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        Cart patchCart = cartRepository.findByCartIdAndMemberMemberId(cartProductCount.getCartId(),authenticatedMemberId);

        if (patchCart == null) {
            throw new BusinessLogicException(ExceptionCode.CART_NOT_FOUND);
        }

        patchCart.updateProductCount(cartProductCount.getCount());
        cartRepository.save(patchCart);
        List<Cart> cartList = cartRepository.findAllByMemberMemberId(authenticatedMemberId);
        Integer totalPrice = getTotalPrice(cartList);
        CartResDto.PatchTotalPrcie patchTotalPrcie = CartResDto.PatchTotalPrcie.builder()
                .totalPrice(totalPrice).build();

        return patchTotalPrcie;
    }

    @Override
    public CartResDto.CartAllInfo paymentSelectedProduct(CartReqDto.CartIds cartIds) {
        long authenticatedMemberId = SecurityUtil.getLoginMemberId();
        List<Long> selectedCartIds = cartIds.getCartIds();

        if (selectedCartIds.isEmpty()) {
            throw new IllegalArgumentException("선택된 카트가 없습니다.");
        }

        List<Cart> cartList = cartRepository.findAllByCartIdInAndMemberMemberId(selectedCartIds, authenticatedMemberId);

        if (cartList.size() != selectedCartIds.size()) {
            throw new BusinessLogicException(ExceptionCode.CART_NOT_FOUND);
        }

        Integer totalPrice = getTotalPrice(cartList);

        return getCartAllInfo(cartList, totalPrice);
    }


    private CartResDto.CartAllInfo getCartAllInfo(List<Cart> cartList, Integer totalPrice) {
        List<CartResDto.CartInfo> cartInfos = cartMapper.cartsToCartsResDtos(cartList);
        CartResDto.CartAllInfo cartAllInfo = CartResDto.CartAllInfo.builder()
                .cartInfos(cartInfos)
                .totalPrice(totalPrice)
                .build();
        return cartAllInfo;
    }

    private static Integer getTotalPrice(List<Cart> cartList) {
        Integer totalPrice = 0;
        for(Cart cart : cartList){
            totalPrice += cart.getProduct().getProductPrice() * cart.getProductCount();
        }
        return totalPrice;
    }


}
