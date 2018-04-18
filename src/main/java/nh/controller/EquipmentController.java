package nh.controller;

import io.swagger.annotations.ApiOperation;
import nh.beans.Equipment;
import nh.beans.Page;
import nh.beans.PageMax;
import nh.server.ServerHeartbeatHandler;
import nh.service.EquipmentService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EquipmentController {


    @Autowired
    private EquipmentService equipmentService;

    @ApiOperation(value = "查询列表")
    @GetMapping("/Equipment/list")
    public List<Equipment> list(@RequestParam Integer pageNext, @RequestParam Integer pageSize ){
        Page page=new Page();
        page.setPageSize(pageSize);
        page.setPageNext(pageNext);
        return equipmentService.list(page);
    }

    @ApiOperation(value = "添加设备")
    @PostMapping("/Equipment/add")
    public String equipmentAdd(@RequestBody Equipment equipment){
     try {
         equipmentService.equipmentAdd(equipment);
         return "200";
     }catch (Exception e){
         e.printStackTrace();
         return "500";
     }

    }
    @ApiOperation(value = "修改设备")
    @PutMapping("/Equipment/update")
    public String equipmentUpdate(@RequestBody Equipment equipment){
        try {
            equipmentService.equipmentUpdate(equipment);
            return "200";
        }catch (Exception e){
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "查询单个")
    @GetMapping("/Equipment/one")
    public Equipment listOne(@RequestParam String id){

           return equipmentService.listOne(id);

    }

    @ApiOperation(value = "最大页数")
    @GetMapping("/Equipment/pagemax")
    public PageMax pageMax(){
        PageMax pageMax=new PageMax();
        pageMax.setMax((int) Math.ceil(equipmentService.count()));
        pageMax.setCount(equipmentService.count());
        return  pageMax;
    }

}
