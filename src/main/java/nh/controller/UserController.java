package nh.controller;

import io.swagger.annotations.ApiOperation;

import nh.beans.Page;
import nh.beans.PageMax;
import nh.beans.User;
import nh.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
   @Autowired
    UserService userService;

    @ApiOperation(value = "登录")
    @PostMapping("/user/login")
    public Map<String,Object> login(@RequestParam(required=false) String username, @RequestParam(required=false) String password){
        System.out.println(username+password);
        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
        Subject subject = SecurityUtils.getSubject();
        Map<String,Object>map=new HashMap<>();
        try {
            subject.login(usernamePasswordToken);
//            //使用shiro后，session交由shiro管理，获取shiro管理的session
//          Session session=subject.getSession();
//          session.setAttribute("sss","sdas");
            map.put("code","200");
            return map;
        }catch (Exception e){
            e.printStackTrace();
            map.put("code","500");
//    Session session=subject.getSession();
    //获取session id
           return map;
}
    }

    @ApiOperation(value = "查询单个")
    @GetMapping("/user/one")

    public User listOne(@RequestParam String id){
        return userService.listOne(id);
    }

    @ApiOperation(value = "查询列表")
    @PostMapping("/user/list")
   public List<User> list(@RequestBody Page page){
            return userService.list(page);
    }


    @GetMapping("/logout")
    public String logout(){
      SecurityUtils.getSubject().logout();
       return "/login";
    }
    @ApiOperation(value = "添加用户")
    @PostMapping("/user/add")
    public String add(@RequestBody User user){
        try{
            userService.add(user);
            return "200";
        }catch (Exception e){
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "修改用户")
    @PutMapping("/user/update")
    public String update(@RequestBody User user){
        try{
            userService.update(user);
            return "200";
        }catch (Exception e){
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "删除用户")
    @DeleteMapping("/user/delete/{id}")
    public String delete(@PathVariable String id){
        try{
            userService.delete(id);
            return "200";
        }catch (Exception e){
            e.printStackTrace();
            return "500";
        }
    }

    @ApiOperation(value = "最大页数")
    @GetMapping("/user/pagemax")
    public PageMax pageMax(){
        PageMax pageMax=new PageMax();
        pageMax.setMax((int) Math.ceil(userService.count()));
        pageMax.setCount(userService.count());
        return  pageMax;
    }

    @ApiOperation(value = "模糊查询")
    @GetMapping("/user/search")
    public List<User> like(String str){

        return userService.search(str);
    }
}
