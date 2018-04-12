package nh.service.impl;

import nh.beans.Equipment;
import nh.beans.Page;
import nh.dao.EquipmentMapper;
import nh.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional(readOnly = true)
public class EquipmentServiceImpl implements EquipmentService{

    @Autowired
    private EquipmentMapper equipmentMapper;
    @Override
    public List<Equipment> list(Page page) {
        return equipmentMapper.list(page);
    }
}
