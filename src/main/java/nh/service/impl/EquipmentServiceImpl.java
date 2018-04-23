package nh.service.impl;

import nh.beans.Equipment;
import nh.beans.Page;
import nh.dao.EquipmentMapper;
import nh.dto.ClientHttpRequest3;
import nh.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class EquipmentServiceImpl implements EquipmentService{

    @Autowired
    private EquipmentMapper equipmentMapper;
    @Override
    public List<Equipment> list(Page page) {

        return equipmentMapper.list(page);
    }

    @Override
    @Transactional
    public void equipmentAdd(Equipment equipment) {
        equipment.setId(UUID.randomUUID().toString());
       equipment.setCreateTime(new Date());
       equipment.setUpdateTime(new Date());
        equipmentMapper.add(equipment);
        equipmentMapper.responseAdd(equipment.getEquipmentDid());
    }

    @Override
    @Transactional
    public void equipmentUpdate(Equipment equipment) {
      equipmentMapper.update(equipment);
    }

    @Override
    public Equipment listOne(String id) {
        return equipmentMapper.listOne(id);
    }

    @Override
    public Long count() {
        return equipmentMapper.count();
    }

    @Override
    public Equipment httpResponse(String did) {
        return equipmentMapper.httpResponse(did);
    }

    @Override
    @Transactional
    public void responseAdd(String did) {
        equipmentMapper.responseAdd(did);
    }

    @Override
    @Transactional
    public void requestUpdate(ClientHttpRequest3 clientHttpRequest3) {
        equipmentMapper.requestUpdate(clientHttpRequest3);
    }
}
