package com.buyte.product.repository;

import com.buyte.product.entity.Product;
import com.buyte.product.entity.ProductIngerdient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductIngredientRepository extends JpaRepository<ProductIngerdient, Long> {
    List<ProductIngerdient> findByProduct(Product product);
}
