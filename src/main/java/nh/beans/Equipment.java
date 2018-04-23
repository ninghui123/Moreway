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
    private String responseId;

    private Integer did;//设备号
    private Integer flow;//净水流出汇总流量
    private Integer tdsi;//原水TDS值
    private Integer tdso;//净水TDS值
    private Integer t;//净水流出温度
    private Integer rs;//设备运行状态
    private Integer dbg;//调试状态标志
    private Integer us;//用户开关机状态
    private Integer fault;//设备故障状态





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

    public String getResponseId() {
        return responseId;
    }

    public void setResponseId(String responseId) {
        this.responseId = responseId;
    }

    public Integer getFlow() {
        return flow;
    }

    public void setFlow(Integer flow) {
        this.flow = flow;
    }

    public Integer getTdsi() {
        return tdsi;
    }

    public void setTdsi(Integer tdsi) {
        this.tdsi = tdsi;
    }

    public Integer getTdso() {
        return tdso;
    }

    public void setTdso(Integer tdso) {
        this.tdso = tdso;
    }

    public Integer getT() {
        return t;
    }

    public void setT(Integer t) {
        this.t = t;
    }

    public Integer getRs() {
        return rs;
    }

    public void setRs(Integer rs) {
        this.rs = rs;
    }

    public Integer getDbg() {
        return dbg;
    }

    public void setDbg(Integer dbg) {
        this.dbg = dbg;
    }

    public Integer getUs() {
        return us;
    }

    public void setUs(Integer us) {
        this.us = us;
    }

    public Integer getFault() {
        return fault;
    }

    public void setFault(Integer fault) {
        this.fault = fault;
    }

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }
}
