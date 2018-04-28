package nh.controller;

import io.swagger.annotations.ApiOperation;
import nh.ExceptionHandle;
import nh.ReturnMsg;
import nh.beans.Equipment;
import nh.beans.Page;
import nh.beans.PageMax;
import nh.beans.User;
import nh.service.EquipmentService;
import org.apache.ibatis.annotations.Delete;
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

    @ApiOperation(value = "删除设备")
    @DeleteMapping("/Equipment/delete/{did}")
    private String delete(@PathVariable String did){
        try {
            equipmentService.delete(did);
            return "200";
        }catch (Exception e){
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "测试")
    @GetMapping("/Equipment/test")
    public ReturnMsg test(){
                User user=new User();
                user.setId("1");
                user.setNickname("ninghui");
                user.setPswd("123");
                return new  ReturnMsg(200,user,"成功");
    }
}
