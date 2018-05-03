package nh.controller;

import io.swagger.annotations.ApiOperation;

import nh.ReturnMsg;
import nh.beans.Page;
import nh.beans.PageMax;
import nh.beans.User;
import nh.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;


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
            return new ReturnMsg(200,user,"成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnMsg(500,null,"用户名或者密码错误");
        }
    }



    @ApiOperation(value = "查询单个")
    @GetMapping("/user/one")
    public User listOne(@RequestParam String id) {
        return userService.listOne(id);
    }

    @ApiOperation(value = "查询列表")
    @GetMapping("/user/list")
    public List<User> list(@RequestParam Integer pageNext, @RequestParam Integer pageSize) {
        Page page = new Page();
        page.setPageSize(pageSize);
        page.setPageNext(pageNext);
        return userService.list(page);
    }


    @GetMapping("/logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        return "/login";
    }

    @ApiOperation(value = "添加用户")
    @PostMapping("/user/add")
    public String add(@RequestBody User user) {
        try {
            userService.add(user);
            return "200";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "500";
    }

    @ApiOperation(value = "修改用户")
    @PutMapping("/user/update")
    public String update(@RequestBody User user) {
        try {
            userService.update(user);
            return "200";
        } catch (Exception e) {
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "删除用户")
    @DeleteMapping("/user/delete/{id}")
    public String delete(@PathVariable String id) {
        try {
            userService.delete(id);
            return "200";
        } catch (Exception e) {
            e.printStackTrace();
            return "500";
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
}
