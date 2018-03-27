package nh.dto;


import java.util.Date;

/**
 * 响应数据 901类型
 */
public class Request901 {
    private Integer resType;
    private Integer sn;
    private Integer state;
    private Date tm;
    private Integer hb;

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

    public Date getTm() {
        return tm;
    }

    public void setTm(Date tm) {
        this.tm = tm;
    }

    public Integer getHb() {
        return hb;
    }

    public void setHb(Integer hb) {
        this.hb = hb;
    }

    @Override
    public String toString() {
        return "Request901{" +
                "resType=" + resType +
                ", sn=" + sn +
                ", state=" + state +
                ", tm=" + tm +
                ", hb=" + hb +
                '}';
    }
}
