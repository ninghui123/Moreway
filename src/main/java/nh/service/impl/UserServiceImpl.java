package nh.service.impl;


import nh.beans.User;
import nh.dao.UserMapper;
import nh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User login(String id) {
        return userMapper.login(id);
    }

    @Override
    public User list(String id) {
        return userMapper.list(id);
    }
}
