package nh.service;

import nh.beans.Equipment;
import nh.beans.Page;

import java.util.List;

public interface EquipmentService {
  List<Equipment> list(Page page);


}
