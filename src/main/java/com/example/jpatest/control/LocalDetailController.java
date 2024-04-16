package com.example.jpatest.control;

import com.example.jpatest.entity.AdminItemEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LocalDetailController {

    @GetMapping("/localDetail")
    public String showLocalDetail(Model model) {
        // 관광지 정보를 모델에 추가
        model.addAttribute("adminItemEntity", new AdminItemEntity());

        return "adminhub/localDetail"; // Thymeleaf 템플릿 이름 반환
    }
}