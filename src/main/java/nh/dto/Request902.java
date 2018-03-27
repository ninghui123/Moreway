package nh.dto;

/**
 * 响应数据 902类型
 */
public class Request902 {
    private Integer resType;//请求类型
    private Integer sn;//请求序号

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

    @Override
    public String toString() {
        return "Request902{" +
                "resType=" + resType +
                ", sn=" + sn +
                '}';
    }
}
