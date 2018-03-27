package nh.dto;

import nh.server.DataPacket;

/**
 * 请求数据901类型（设备上线请求）
 */
public class Response901 {
    private Integer reqType;//请求类型
    private Integer sn;//请求序号
    private String did;//设备号
    private String ver;//设备版本号
    private String pwd;//设备控制密码
    private String type;//设备类型

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

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public String getVer() {
        return ver;
    }

    public void setVer(String ver) {
        this.ver = ver;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        DataPacket dataPacket =new DataPacket();
        pwd=dataPacket.encryptionPwd(pwd);
        this.pwd = pwd;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "runningMsg{" +
                "reqType=" + reqType +
                ", sn=" + sn +
                ", did='" + did + '\'' +
                ", ver='" + ver + '\'' +
                ", pwd='" + pwd + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
