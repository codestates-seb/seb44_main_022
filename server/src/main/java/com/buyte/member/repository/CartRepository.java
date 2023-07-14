package com.buyte.member.repository;

import com.buyte.member.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.cartId IN :cartIds AND c.member.memberId = :memberId")
    void deleteByCartIdInaAndMemberMemberId(@Param("cartIds")List<Long> cartIds, @Param("memberId") Long memberId);

    @Transactional
    @Query("select c from Cart c where c.cartId in :cartIds and c.member.memberId = :memberId")
    List<Cart> findAllByCartIdInAndMemberMemberId(@Param("cartIds") List<Long> cartIds, @Param("memberId") Long memberId);

    List<Cart> findAllByMemberMemberId(Long memberId);

    Cart findByCartIdAndMemberMemberId(Long cartId, Long memberId);

    List<Cart> findAllByCartIdIn(List<Long> cartIds);
}
