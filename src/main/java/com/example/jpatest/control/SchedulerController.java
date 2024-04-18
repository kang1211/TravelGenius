package com.example.jpatest.control;

import com.example.jpatest.dto.SchedulerDto;
import com.example.jpatest.entity.LocalEntity;
import com.example.jpatest.repository.LocalRepository;
import com.example.jpatest.service.SchedulerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/schedulers")
public class SchedulerController {

    private final SchedulerService schedulerService;
    private final LocalRepository localRepository;
    private static final Logger logger = LoggerFactory.getLogger(SchedulerController.class);

    @Autowired
    public SchedulerController(SchedulerService schedulerService,
                                LocalRepository localRepository) {
        this.schedulerService = schedulerService;
        this.localRepository = localRepository;
    }

    @GetMapping("/first")
    public String first(Model model) {
        SchedulerDto schedulerDto = new SchedulerDto();
        model.addAttribute("schedulerDto", schedulerDto);
        return "scheduler/first";
    }

    @PostMapping("/second")
    public String second(@ModelAttribute("schedulerDto") SchedulerDto schedulerDto, Model model) {
        // 모든 LocalEntity 조회
        List<LocalEntity> localEntities = localRepository.findAll();

        // 조회된 데이터를 모델에 추가
        model.addAttribute("localEntities", localEntities);

        // schedulerDto 저장
        schedulerService.saveScheduler(schedulerDto);
        logger.info("Received schedulerDto: {}", schedulerDto);

        // 두 번째 페이지로 리다이렉트
        return "scheduler/second";
    }


    @PostMapping("/third")
    public String third(Model model) {
        SchedulerDto schedulerDto = new SchedulerDto();
        model.addAttribute("schedulerDto", schedulerDto);
        return "scheduler/third";
    }

}