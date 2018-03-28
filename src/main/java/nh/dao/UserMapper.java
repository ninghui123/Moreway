package nh.dao;


import nh.beans.Page;
import nh.beans.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User login(@Param("username") String username);
    User listOne(@Param("id")String id);
    void add(User user);
    void update(User user);
    void delete(@Param("id")String id);
    User list(@Param("page") Page page);
    Long count();
}
