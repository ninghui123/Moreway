package nh.dao;

import nh.beans.Equipment;
import nh.beans.Page;
import nh.dto.CilentHttpResponse3;
import nh.dto.ClientHttpRequest3;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EquipmentMapper {
    List<Equipment> list(@Param("page") Page page);

    void add(Equipment equipment);

    void update(Equipment equipment);

    Equipment listOne(@Param("id") String id);

    long count();

    Equipment httpResponse(@Param("did") String did);

    void responseAdd(@Param("did") String did);

    void requestUpdate(ClientHttpRequest3 clientHttpRequest3);
}
