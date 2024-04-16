package com.example.jpatest.service;

import com.example.jpatest.dto.AdminItemDto;
import com.example.jpatest.entity.AdminItemEntity;
import com.example.jpatest.entity.LocalEntity;
import com.example.jpatest.repository.AdminItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AdminItemService {

    // localId에 해당하는 관광지 정보 조회 메서드 선언
    @Transactional
    public AdminItemEntity findItemByLocalId(Long localId) {
        // AdminItemRepository를 사용하여 localId에 해당하는 AdminItemEntity를 조회
        return adminItemRepository.findById((long) localId).orElse(null);
    }
    private final AdminItemRepository adminItemRepository;

    @Autowired
    public AdminItemService(AdminItemRepository adminItemRepository) {
        this.adminItemRepository = adminItemRepository;
    }

    @Transactional
    public void saveAdminItem(AdminItemDto adminItemDto, LocalEntity localEntity) {
        // AdminItemDto를 AdminItemEntity로 변환
        AdminItemEntity adminItemEntity = new AdminItemEntity();
        adminItemEntity.setImageUrl(adminItemDto.getImgUrl());
        adminItemEntity.setTouristSpotName(adminItemDto.getTouristSpotName());
        adminItemEntity.setAddress(adminItemDto.getAddress());
        adminItemEntity.setContact(adminItemDto.getContact());
        adminItemEntity.setFeatures(adminItemDto.getFeatures());
        adminItemEntity.setBusinessHours(adminItemDto.getBusinessHours());
        adminItemEntity.setLocal(localEntity); // LocalEntity 설정

        // AdminItemEntity 저장
        adminItemRepository.save(adminItemEntity);
    }

    private AdminItemEntity convertToEntity(AdminItemDto adminItemDto) {
        AdminItemEntity adminItemEntity = new AdminItemEntity();

        // LocalEntity 설정
        LocalEntity localEntity = new LocalEntity();
        localEntity.setId(adminItemDto.getLocalId()); // LocalEntity의 ID 설정
        adminItemEntity.setLocal(localEntity);

        // 나머지 필드 설정
        adminItemEntity.setTouristSpotName(adminItemDto.getTouristSpotName());
        adminItemEntity.setAddress(adminItemDto.getAddress());
        adminItemEntity.setContact(adminItemDto.getContact());
        adminItemEntity.setFeatures(adminItemDto.getFeatures());
        adminItemEntity.setBusinessHours(adminItemDto.getBusinessHours());
        adminItemEntity.setImgUrl(adminItemDto.getImgUrl());

        return adminItemEntity;
    }
}
