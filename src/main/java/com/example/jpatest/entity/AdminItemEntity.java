
package com.example.jpatest.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "admin_item")
public class AdminItemEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "local_id", nullable = false) // 외래 키 설정
    private LocalEntity local;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tourist_spot_name")
    private String touristSpotName;

    @Column(name = "address")
    private String address;

    @Column(name = "contact")
    private String contact;

    @Column(name = "features")
    private String features;

    @ElementCollection
    @CollectionTable(name = "admin_item_business_hours", joinColumns = @JoinColumn(name = "admin_item_id"))
    @MapKeyColumn(name = "day_of_week")
    @Column(name = "hours_of_operation")
    private Map<String, String> businessHours = new HashMap<>();

    @Column(name = "img_url")
    private String imgUrl; // 이미지 경로

    // 이미지 URL을 가져오는 메서드

    @Override
    public String toString() {
        return "AdminItemEntity{" +
                "id=" + id +
                ", touristSpotName='" + touristSpotName + '\'' +
                ", address='" + address + '\'' +
                ", contact='" + contact + '\'' +
                ", features='" + features + '\'' +
                ", businessHours=" + businessHours +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }
}