package nh.dao;

import nh.beans.Dealer;
import nh.beans.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DealerMapper {

    List<Dealer>list(@Param("page") Page page);
    void add(Dealer dealer);
    void update(Dealer dealer);
    Integer count();
    Dealer listOne(String id);
    void  delete(String id);
}
