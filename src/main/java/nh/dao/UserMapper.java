package nh.dao;


import nh.beans.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User login(@Param("username") String username);
    User list(@Param("id")String id);
}
