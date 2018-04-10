package nh.controller;

import io.swagger.annotations.ApiOperation;
import nh.beans.Equipment;
import nh.beans.Page;
import nh.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @ApiOperation(value = "查询列表")
    @PostMapping("/Equipment/list")
    public List<Equipment> list(@RequestParam Integer pageNext, @RequestParam Integer pageSize ){
        Page page=new Page();
        page.setPageSize(pageSize);
        page.setPageNext(pageNext);
        return equipmentService.list(page);
    }
}
