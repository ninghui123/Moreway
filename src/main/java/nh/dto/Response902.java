package nh.dto;

/**
 * 请求数据902类型（心跳包请求）
 */
public class Response902 {
    private Integer reqType;//请求类型
    private Integer sn;//请求序号

    public Integer getReqType() {
        return reqType;
    }

    public void setReqType(Integer reqType) {
        this.reqType = reqType;
    }

    public Integer getSn() {
        return sn;
    }

    public void setSn(Integer sn) {
        this.sn = sn;
    }


    @Override
    public String toString() {
        return "HeartBeat{" +
                "reqType=" + reqType +
                ", sn=" + sn +
                '}';
    }
}
