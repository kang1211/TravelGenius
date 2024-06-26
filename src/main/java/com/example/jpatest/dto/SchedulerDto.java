package com.example.jpatest.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.ElementCollection;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class SchedulerDto {
    private String departureHour;
    private String departureMinute;
    private String arrivalHour;
    private String arrivalMinute;
    private String trip_duration_start;
    private String trip_duration_end;
    private String localIds;
    private String spotIds;
    private String stayIds;
    private String spotMarks;
    private String stayMarks;
    private double lat;
    private double lng;
    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
    private Long resultItemId;
    private Long id; // 식별자(ID) 필드

    // Getter 및 Setter 메서드
    // 필요에 따라 다른 메서드들을 추가할 수 있습니다.
    @Override
    public String toString() {
        return "SchedulerDto{" +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +

                '}';
    }
}