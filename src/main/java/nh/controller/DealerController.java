package nh.controller;


import io.swagger.annotations.ApiOperation;
import nh.ReturnMsg;
import nh.beans.Dealer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import static nh.ReturnMsg.err;
import static nh.ReturnMsg.success;

@RestController
public class DealerController {

    @Value("${uploadPath}")
    String uploadPath;

    @ApiOperation(value = "测试")
    @GetMapping("/dealer/test")
    public ReturnMsg test(){
        System.out.println(uploadPath);
        return null;
    }



    @ApiOperation(value = "查询列表")
    @GetMapping("/dealer/list")
    public ReturnMsg list(){
        try{
            return success(200,null,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "删除")
    @DeleteMapping("/dealer/delete/{id}")
    public ReturnMsg delete(@PathVariable String id){
        try{
            return success(200,null,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "修改")
    @PutMapping("/dealer/update")
    public ReturnMsg update(@RequestParam String id){
        try{
            return  success(200,null,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "添加")
    @PostMapping("/dealer/add")
    public ReturnMsg add(@RequestBody Dealer dealer){
   try{
       return success(200,null,"成功");
   }catch (Exception e){
       e.printStackTrace();
       return err(500,"失败");
   }
    }
}

