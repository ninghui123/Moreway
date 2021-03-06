package nh.service;


import nh.beans.Page;
import nh.beans.User;
import nh.beans.UserDto;

import java.util.List;

public interface UserService {
    User login(String username);

    User listOne(String id);

    List<User> list(Page page);

    void add(User user);

    void update(User user);

    void delete(String id);

    Long count();

    List<UserDto> search(String str,Page page);

}
