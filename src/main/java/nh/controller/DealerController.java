package nh.controller;


import io.swagger.annotations.ApiOperation;
import nh.ReturnMsg;
import nh.beans.Dealer;
import nh.beans.Page;
import nh.service.DealerServer;
import nh.util.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static nh.ReturnMsg.err;
import static nh.ReturnMsg.success;

@RestController
public class DealerController {
    @Autowired
    DealerServer dealerServer;

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
    public ReturnMsg list(@RequestParam Integer pageNext, @RequestParam Integer pageSize){
        try{
            Page page=new Page();
            page.setPageNext(pageNext);
            page.setPageSize(pageSize);
            List<Dealer> list=dealerServer.list(page);
            int count=dealerServer.count();
            return success(200,new PageUtil(list,count),"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "删除")
    @DeleteMapping("/dealer/delete/{id}")
    public ReturnMsg delete(@PathVariable String id){
        try{
            dealerServer.delete(id);
            return success(200,null,"删除成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "修改")
    @PutMapping("/dealer/update")
    public ReturnMsg update(@RequestBody Dealer dealer){
        try{
            dealerServer.update(dealer);
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
       dealerServer.add(dealer);
       return success(200,null,"经销商添加成功");
   }catch (Exception e){
       e.printStackTrace();
       return err(500,"失败");
   }
    }

    @ApiOperation(value = "查询单个")
    @GetMapping("/dealer/one")
    public ReturnMsg listOne(@RequestParam String id){
        try{
            Dealer dealer=dealerServer.listOne(id);
            return success(200,dealer,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"错误");
        }

    }
}

