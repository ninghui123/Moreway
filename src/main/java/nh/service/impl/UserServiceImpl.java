package nh.service.impl;


import nh.beans.Page;
import nh.beans.User;
import nh.dao.UserMapper;
import nh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

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
    public User listOne(String id) {
        return userMapper.listOne(id);
    }

    @Override
    public List<User> list(Page page) {
        return userMapper.list(page);
    }

    @Override
    @Transactional
    public void add(User user) {
        user.setId(UUID.randomUUID().toString());
        user.setCreateTime(new Date());
        userMapper.add(user);
    }

    @Override
    @Transactional
    public void update(User user) {
        userMapper.update(user);
    }

    @Override
    @Transactional
    public void delete(String id) {
        userMapper.delete(id);
    }

    @Override
    public Long count() {
        return userMapper.count();
    }

}
