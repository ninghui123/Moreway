package nh.service;

import nh.beans.Equipment;
import nh.beans.Page;
import nh.dto.ClientHttpRequest3;

import java.util.List;

public interface EquipmentService {
    List<Equipment> list(Page page);

    void equipmentAdd(Equipment equipment);

    void equipmentUpdate(Equipment equipment);

    Equipment listOne(String id);

    Long count();

    Equipment httpResponse(String did);

    void responseAdd(String did);

    void requestUpdate(ClientHttpRequest3 clientHttpRequest3);

}
