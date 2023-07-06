package com.buyte.store.repository;

import com.buyte.store.entity.Store;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query("SELECT s FROM Store s WHERE s.storeName LIKE %:storeName%")
    List<Store> findByStoreNameContaining(String storeName);
}
