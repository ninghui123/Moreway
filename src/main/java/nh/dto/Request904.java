package nh.dto;

/**
 * 接受数据 904类型
 */
public class Request904 {
    private Integer resType;//响应类型
    private Integer sn;//响应序号
    private Integer m;//延时时间（喂食周期）
    private Integer fc;//单次喂食数量
    private Integer ws;//工作状态
    private Integer fi;//当前喂食份数
    private Timing fp;//自定义设置喂食定时时段
    private Integer fault;//当前故障状态
    private Integer pushCfg;//配置项
    private Integer devlock;//设备锁机状态
    private Integer updState;//固件更新状态

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

    public Integer getM() {
        return m;
    }

    public void setM(Integer m) {
        this.m = m;
    }

    public Integer getFc() {
        return fc;
    }

    public void setFc(Integer fc) {
        this.fc = fc;
    }

    public Integer getWs() {
        return ws;
    }

    public void setWs(Integer ws) {
        this.ws = ws;
    }

    public Timing getFp() {
        return fp;
    }

    public void setFp(Timing fp) {
        this.fp = fp;
    }

    public Integer getFault() {
        return fault;
    }

    public void setFault(Integer fault) {
        this.fault = fault;
    }

    public Integer getPushCfg() {
        return pushCfg;
    }

    public void setPushCfg(Integer pushCfg) {
        this.pushCfg = pushCfg;
    }

    public Integer getDevlock() {
        return devlock;
    }

    public void setDevlock(Integer devlock) {
        this.devlock = devlock;
    }

    public Integer getUpdState() {
        return updState;
    }

    public void setUpdState(Integer updState) {
        this.updState = updState;
    }

    public Integer getFi() {
        return fi;
    }

    public void setFi(Integer fi) {
        this.fi = fi;
    }

    @Override
    public String toString() {
        return "Request904{" +
                "resType=" + resType +
                ", sn=" + sn +
                ", m=" + m +
                ", fc=" + fc +
                ", ws=" + ws +
                ", fi=" + fi +
                ", fp=" + fp +
                ", fault=" + fault +
                ", pushCfg=" + pushCfg +
                ", devlock=" + devlock +
                ", updState=" + updState +
                '}';
    }
}
