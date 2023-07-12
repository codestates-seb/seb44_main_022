package com.buyte.store.repository;

import com.buyte.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Page<Store> findByStoreNameContaining(String search, Pageable pageable);
}
