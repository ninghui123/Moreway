package nh.dto;
//第三次请求
public class ClientHttpRequest3 {
    private Integer req;//请求类型
    private  String did;//设备号
    private  String token;//通信令牌
    private  Integer flow;//净水流出汇总流量
    private  Integer tdsi;//原水TDS值
    private  Integer tdso;//净水TDS值
    private Integer t;//净水流出温度
    private  Integer rs;//设备运行状
    private Integer dbg;//调试状态标志
    private  Integer us;//用户开关机状态
    private  Integer fault;//设备故障状态



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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
}
