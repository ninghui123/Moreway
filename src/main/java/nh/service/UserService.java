package nh.service;


import nh.beans.User;

public interface UserService {
    User login(String username);
    User list(String id);
}
