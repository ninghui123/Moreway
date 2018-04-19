package nh.dto;

//设备第一次请求
public class ClientHttpRequest1 {
    private Integer req;//请求类型
    private String did;//设备号
    private String ver;//设备版本号

    public Integer getReq() {
        return req;
    }

    public void setReq(Integer req) {
        this.req = req;
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

    @Override
    public String toString() {
        return "ClientHttpRequest1{" +
                "req=" + req +
                ", did='" + did + '\'' +
                ", ver='" + ver + '\'' +
                '}';
    }
}
