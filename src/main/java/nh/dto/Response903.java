package nh.dto;

/**
 * 请求数据903类型（获取设备状态）
 */
public class Response903 {
    private Integer reqType;
    private Integer sn;

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
        return "Response903{" +
                "reqType=" + reqType +
                ", sn=" + sn +
                '}';
    }
}
