package nh.beans;

import java.util.Date;

public class Equipment {
    private String id;
    private String equipmentName;
    private String equipmentType;
    private Date createTime;
    private String billingType;
    private Date updateTime;
    private Integer isDelete;
    private Integer status;
    private Date startTime;//租赁开始时间
    private Date stopTime;//租赁到期时间
    private String surplusTime;//租赁剩余时间
    private String equipmentDid;
    private String equipmentAttribute;//设备属性
    private String filterSurplusTime;//滤芯剩余时间
    private  Date filterStartTime;//滤芯开始使用时间
    private  Date filterStopTime;//滤芯到期时间

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getBillingType() {
        return billingType;
    }

    public void setBillingType(String billingType) {
        this.billingType = billingType;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getStopTime() {
        return stopTime;
    }

    public void setStopTime(Date stopTime) {
        this.stopTime = stopTime;
    }

    public String getSurplusTime() {
        return surplusTime;
    }

    public void setSurplusTime(String surplusTime) {
        this.surplusTime = surplusTime;
    }

    public String getEquipmentDid() {
        return equipmentDid;
    }

    public void setEquipmentDid(String equipmentDid) {
        this.equipmentDid = equipmentDid;
    }

    public String getEquipmentAttribute() {
        return equipmentAttribute;
    }

    public void setEquipmentAttribute(String equipmentAttribute) {
        this.equipmentAttribute = equipmentAttribute;
    }

    public String getFilterSurplusTime() {
        return filterSurplusTime;
    }

    public void setFilterSurplusTime(String filterSurplusTime) {
        this.filterSurplusTime = filterSurplusTime;
    }

    public Date getFilterStartTime() {
        return filterStartTime;
    }

    public void setFilterStartTime(Date filterStartTime) {
        this.filterStartTime = filterStartTime;
    }

    public Date getFilterStopTime() {
        return filterStopTime;
    }

    public void setFilterStopTime(Date filterStopTime) {
        this.filterStopTime = filterStopTime;
    }
}
