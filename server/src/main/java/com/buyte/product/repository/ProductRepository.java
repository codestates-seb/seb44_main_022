package com.buyte.product.repository;

import com.buyte.product.entity.Product;
import com.buyte.product.entity.Product.PreferenceProduct;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByPreferenceProduct(PreferenceProduct preferenceProduct);
}
