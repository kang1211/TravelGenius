package com.example.jpatest.dto;

import com.example.jpatest.entity.AdminItemEntity;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class AdminItemDto {
    private String touristSpotName;
    private String address;
    private String contact;
    private String features;
    private String imgUrl; // 이미지 URL을 저장할 필드
    @ElementCollection
    @CollectionTable(name = "admin_item_business_hours", joinColumns = @JoinColumn(name = "admin_item_id"))
    @MapKeyColumn(name = "day_of_week")
    @Column(name = "hours_of_operation")
    private Map<String, String> businessHours; // 영업시간을 저장할 필드

    // 이미지 URL을 설정하는 setter 메서드
    public void setImageUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setBusinessHours(String key, String value) {
        if (this.businessHours == null) {
            this.businessHours = new HashMap<>();
        }
        this.businessHours.put(key, value);
    }
}
