package nh.beans;

import java.util.Date;

public class Dealer {
    private String id;
    private String dealerName;//经销商名字
    private String dealerPhone;//经销商电话
    private String dealerSite;//经销商地址
    private Date createTime;//创建时间
    private Date updateTime;//修改时间
    private  Integer isDelete;//删除

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDealerName() {
        return dealerName;
    }

    public void setDealerName(String dealerName) {
        this.dealerName = dealerName;
    }

    public String getDealerPhone() {
        return dealerPhone;
    }

    public void setDealerPhone(String dealerPhone) {
        this.dealerPhone = dealerPhone;
    }

    public String getDealerSite() {
        return dealerSite;
    }

    public void setDealerSite(String dealerSite) {
        this.dealerSite = dealerSite;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

    @Override
    public String toString() {
        return "Dealer{" +
                "id='" + id + '\'' +
                ", dealerName='" + dealerName + '\'' +
                ", dealerPhone='" + dealerPhone + '\'' +
                ", dealerSite='" + dealerSite + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", isDelete=" + isDelete +
                '}';
    }
}
