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

import java.util.List;

import static nh.ReturnMsg.err;
import static nh.ReturnMsg.success;

@RestController
public class EquipmentController {
    @Value("${uploadPath}")
    String uploadPath;


    @Autowired
    private EquipmentService equipmentService;

    @ApiOperation(value = "查询列表")
    @GetMapping("/Equipment/list")
    public ReturnMsg list(@RequestParam Integer pageNext, @RequestParam Integer pageSize ){
        try{
            Page page=new Page();
            page.setPageSize(pageSize);
            page.setPageNext(pageNext);
            List<Equipment>list=equipmentService.list(page);
            return success(200,list,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"错误");
        }
    }

    @ApiOperation(value = "添加设备")
    @PostMapping("/Equipment/add")
    public ReturnMsg equipmentAdd(@RequestBody Equipment equipment){
     try {
         equipmentService.equipmentAdd(equipment);
         return success(200,null,"成功");
     }catch (Exception e){
         e.printStackTrace();
         return err(500,"失败");
     }

    }
    @ApiOperation(value = "修改设备")
    @PutMapping("/Equipment/update")
    public ReturnMsg equipmentUpdate(@RequestBody Equipment equipment){
        try {
            equipmentService.equipmentUpdate(equipment);
            return success(200,null,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "查询单个")
    @GetMapping("/Equipment/one")
    public ReturnMsg listOne(@RequestParam String id){
              try{
                  Equipment equipment=equipmentService.listOne(id);
                  return success(200,equipment,"成功");
              }catch (Exception e){
                  e.printStackTrace();
                  return err(500,"失败");
              }
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
    private ReturnMsg delete(@PathVariable String did){
        try {
            equipmentService.delete(did);
            return success(200,null,"成功了");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "测试")
    @PostMapping("/Equipment/test")
    public ReturnMsg test(@RequestParam("file")MultipartFile file){
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
            return success(200,pageUtil,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }
}
