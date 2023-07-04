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
    @Query("delete from Cart c where c.cartId in :cartIds")
    void deleteByCartIdIn(@Param("cartIds")List<Long> cartIds);
}
