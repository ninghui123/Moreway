package nh.controller;

import io.swagger.annotations.ApiOperation;

import nh.ReturnMsg;
import nh.beans.Page;
import nh.beans.PageMax;
import nh.beans.User;
import nh.beans.UserDto;
import nh.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static nh.ReturnMsg.err;
import static nh.ReturnMsg.success;


@RestController
public class UserController {
    @Autowired
    UserService userService;


    @ApiOperation(value = "登录")
    @PostMapping("/user/login")
    public ReturnMsg login(@RequestParam String username, @RequestParam String password) {
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(username, password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(usernamePasswordToken);
            String user= (String) subject.getPrincipal();
//          subject.getSession().setTimeout(10);
            return success(200,user,"成功");
        } catch (Exception e) {
            e.printStackTrace();
            return err(500,"用户名或者密码错误");
        }
    }



    @ApiOperation(value = "查询单个")
    @GetMapping("/user/one")
    public User listOne(@RequestParam String id) {
        return userService.listOne(id);
    }

    @ApiOperation(value = "查询列表")
    @GetMapping("/user/list")
    public ReturnMsg list(@RequestParam Integer pageNext, @RequestParam Integer pageSize) {
        try{ Page page = new Page();
            page.setPageSize(pageSize);
            page.setPageNext(pageNext);
            List<User>list=userService.list(page);
            return success(200,list,"成功");
        }catch (Exception e){
            e.printStackTrace();
           return err(500,"查询失败");
        }

    }


    @GetMapping("/logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        return "/login";
    }

    @ApiOperation(value = "添加用户")
    @PostMapping("/user/add")
    public ReturnMsg add(@RequestBody User user) {
        try {
            userService.add(user);
            return success(200,null,"成功");
        } catch (Exception e) {
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "修改用户")
    @PutMapping("/user/update")
    public ReturnMsg update(@RequestBody User user) {
        try {
            userService.update(user);
            return success(200,null,"成功");
        } catch (Exception e) {
            e.printStackTrace();
            return err(500,"错误");
        }
    }

    @ApiOperation(value = "删除用户")
    @DeleteMapping("/user/delete/{id}")
    public ReturnMsg delete(@PathVariable String id) {
        try {
            userService.delete(id);
            return success(200,null,"成功");
        } catch (Exception e) {
            e.printStackTrace();
            return err(500,"失败");
        }
    }

    @ApiOperation(value = "最大页数")
    @GetMapping("/user/pagemax")
    public PageMax pageMax() {
        PageMax pageMax = new PageMax();
        pageMax.setMax((int) Math.ceil(userService.count()));
        pageMax.setCount(userService.count());
        return pageMax;
    }

    @ApiOperation(value = "模糊查询")
    @GetMapping("/user/search")
    public ReturnMsg like(@RequestParam String str,@RequestParam Integer pageNext){
        try{
            Page page=new Page();
            page.setPageSize(10);
            page.setPageNext(pageNext);
            List<UserDto>user=userService.search(str,page);
            return success(200,user,"成功");
        }catch (Exception e){
            e.printStackTrace();
            return err(500,"查询错误");
        }
    }

}
