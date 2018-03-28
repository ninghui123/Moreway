package nh.service;


import nh.beans.Page;
import nh.beans.User;

public interface UserService {
    User login(String username);
    User listOne(String id);
    User list(Page page);
    void add(User user);
    void update(User user);
    void delete(String id);
    Long count();
}
