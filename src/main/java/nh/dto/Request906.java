package nh.dto;

/**
 * 接收数据 906类型
 */
public class Request906 {
    private Integer resType;//响应类型
    private Integer sn;//响应序号
    private  Integer state;//状态

    public Integer getResType() {
        return resType;
    }

    public void setResType(Integer resType) {
        this.resType = resType;
    }

    public Integer getSn() {
        return sn;
    }

    public void setSn(Integer sn) {
        this.sn = sn;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Request906{" +
                "resType=" + resType +
                ", sn=" + sn +
                ", state=" + state +
                '}';
    }
}
