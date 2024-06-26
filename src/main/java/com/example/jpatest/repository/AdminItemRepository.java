package com.example.jpatest.repository;


import com.example.jpatest.entity.AdminItemEntity;
import com.example.jpatest.entity.LocalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminItemRepository extends JpaRepository<AdminItemEntity, Long> {
    // 필요한 추가적인 Repository 메서드 정의 가능
    List<AdminItemEntity> findByLocal(LocalEntity localEntity);

    List<AdminItemEntity> findByLocalAndContentType(LocalEntity localEntity, String contentType);

    List<AdminItemEntity> findByLocalId(Long localId);

    @Query("SELECT a FROM AdminItemEntity a WHERE a.id IN :ids")
    List<AdminItemEntity> findByIds(@Param("ids") List<Long> ids);

}