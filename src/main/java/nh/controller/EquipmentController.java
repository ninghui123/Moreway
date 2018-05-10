package nh.controller;

import io.swagger.annotations.ApiOperation;
import nh.ReturnMsg;
import nh.beans.*;
import nh.service.EquipmentService;
import nh.util.PageUtil;
import nh.util.UpLoad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class EquipmentController {
    @Value("${uploadPath}")
    String uploadPath;


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
    @PostMapping("/Equipment/test")
    public ReturnMsg test(@RequestParam("file")MultipartFile file) throws IOException {
        try {
            String path="images"+UpLoad.upLoadFile(file,uploadPath);
            return new ReturnMsg(200,path,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return new ReturnMsg(500,null,"失败");
        }
    }

    @ApiOperation(value = "模糊查询")
    @GetMapping("/Equipment/search")
    public ReturnMsg like(@RequestParam String str, @RequestParam Integer pageNext){
        try{
            Page page=new Page();
            page.setPageNext(pageNext);
            page.setPageSize(10);
            List<EquipmentDto>list=equipmentService.like(str,page);
            PageUtil pageUtil=new PageUtil(list,10);
            return new ReturnMsg(200,pageUtil,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return new ReturnMsg(500,null,"失败");
        }
    }
}
