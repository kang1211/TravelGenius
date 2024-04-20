package com.example.jpatest.control;

import com.example.jpatest.dto.SchedulerDto;
import com.example.jpatest.entity.AdminItemEntity;
import com.example.jpatest.entity.LocalEntity;
import com.example.jpatest.entity.Scheduler;
import com.example.jpatest.repository.LocalRepository;
import com.example.jpatest.service.AdminItemService;
import com.example.jpatest.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

import static com.example.jpatest.entity.QAdminItemEntity.adminItemEntity;

@Controller
@RequiredArgsConstructor
@RequestMapping("/schedulers")
public class SchedulerController {

    private final SchedulerService schedulerService;
    private final LocalRepository localRepository;

    private final AdminItemService adminItemService;
    private static final Logger logger = LoggerFactory.getLogger(SchedulerController.class);

    @GetMapping("/first")
    public String first(Model model, HttpSession session) {
        SchedulerDto schedulerDto = new SchedulerDto();
        session.setAttribute("schedulerDto", schedulerDto);
        model.addAttribute("schedulerDto", schedulerDto);
        return "scheduler/first";
    }

    @PostMapping("/second")
    public String second(@ModelAttribute("schedulerDto") SchedulerDto schedulerDto, Model model,HttpSession session) {
        session.setAttribute("schedulerDto", schedulerDto);
        // 모든 LocalEntity 조회
        List<LocalEntity> localEntities = localRepository.findAll();

        // 조회된 데이터를 모델에 추가
        model.addAttribute("localEntities", localEntities);
        model.addAttribute("schedulerDto", schedulerDto);
        // schedulerDto 저장
/*        schedulerService.saveScheduler(schedulerDto);*/
        System.out.println(schedulerDto.getTrip_duration_end());
        logger.info("Received schedulerDto: {}", schedulerDto.getTrip_duration_end());

        // 두 번째 페이지로 리다이렉트
        return "scheduler/second";
    }


    @PostMapping("/third")
    public String Third(@ModelAttribute("schedulerDto") SchedulerDto schedulerDto,
                        @RequestParam("localId") String localIds, Model model,
                        HttpSession session) {
        schedulerDto = (SchedulerDto) session.getAttribute("schedulerDto");
        System.out.println(schedulerDto.getTrip_duration_end());
        logger.info("Received schedulerDto: {}", schedulerDto.getTrip_duration_end());

        // localIds를 쉼표(,)로 분할하여 각 localId를 추출
        String[] localIdArray = localIds.split(",");

        // 각 localId에 대해 관련 데이터를 가져오고 모델에 추가
        List<AdminItemEntity> adminItemEntityList = new ArrayList<>();
        for (String localId : localIdArray) {
            List<AdminItemEntity> itemsForLocalId = adminItemService.findBylistId(Long.parseLong(localId));
            adminItemEntityList.addAll(itemsForLocalId);
        }

        // 모델에 데이터 추가
        model.addAttribute("adminItemEntity", adminItemEntityList);
        model.addAttribute("schedulerDto", schedulerDto);

        return "scheduler/third";
    }


}