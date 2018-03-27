package nh.controller;

import io.swagger.annotations.ApiOperation;

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
import java.util.Map;

@RestController
public class UserController {
   @Autowired
    UserService userService;

    @ApiOperation(value = "登录")
//   @PutMapping("/login")
    @GetMapping("/login")
//    @DeleteMapping("/login")
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
//          //获取session id
//            response.sendRedirect("/index.html");
            map.put("code","500");
            return map;
        }catch (Exception e){
            e.printStackTrace();
            map.put("code","200");
//    Session session=subject.getSession();
    //获取session id
           return map;
}
    }

    @ApiOperation(value = "查询列表")
    @GetMapping("/list")
    public User list(@RequestParam String id){
        return userService.list(id);
    }


    @GetMapping("/logout")
    public String logout(){
      SecurityUtils.getSubject().logout();
       return "/login";
    }
}
