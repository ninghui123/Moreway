package nh.dto;
//第三次响应
public class CilentHttpResponse3 {
    private Integer res;//响应类型
    private Integer state;//响应状态
    private  Integer cyc;//设置数据上传周期
    private  Integer tl;//设置剩余租赁时间
    private  Integer pc;//强制开关机控制
    private  Integer mc;//手动清洗控制
    private Integer fs;//滤芯状态
    private  Integer dbg;//设置调试状态
    private  Integer flow;//设置调整净水流出汇总流量


    public Integer getRes() {
        return res;
    }

    public void setRes(Integer res) {
        this.res = res;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getCyc() {
        return cyc;
    }

    public void setCyc(Integer cyc) {
        this.cyc = cyc;
    }

    public Integer getTl() {
        return tl;
    }

    public void setTl(Integer tl) {
        this.tl = tl;
    }

    public Integer getPc() {
        return pc;
    }

    public void setPc(Integer pc) {
        this.pc = pc;
    }

    public Integer getMc() {
        return mc;
    }

    public void setMc(Integer mc) {
        this.mc = mc;
    }

    public Integer getFs() {
        return fs;
    }

    public void setFs(Integer fs) {
        this.fs = fs;
    }

    public Integer getDbg() {
        return dbg;
    }

    public void setDbg(Integer dbg) {
        this.dbg = dbg;
    }

    public Integer getFlow() {
        return flow;
    }

    public void setFlow(Integer flow) {
        this.flow = flow;
    }
}
