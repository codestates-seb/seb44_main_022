package com.buyte.product.repository;

import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByPreferenceProduct(PreferenceProduct preferenceProduct, Pageable pageable);
}
