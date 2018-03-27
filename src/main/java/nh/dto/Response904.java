package nh.dto;

/**
 * 请求数据904类型(设置请求)
 */
public class Response904 {
    private Integer resType;//相应类型
    private Integer  sn;//响应序号
    private Integer devlock;//设备锁机状态
    private  Integer pushCfg;//配置顶
    private  Integer m;//延时时间设置（喂食周期）
    private Integer fc;//单次喂食数量设置
    private  Integer ws;//工作状态控制
    private  Timing fp;//自定义设置喂食定时时段

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

    public Integer getDevlock() {
        return devlock;
    }

    public void setDevlock(Integer devlock) {
        this.devlock = devlock;
    }

    public Integer getPushCfg() {
        return pushCfg;
    }

    public void setPushCfg(Integer pushCfg) {
        this.pushCfg = pushCfg;
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

    @Override
    public String toString() {
        return "Response904{" +
                "resType=" + resType +
                ", sn=" + sn +
                ", devlock=" + devlock +
                ", pushCfg=" + pushCfg +
                ", m=" + m +
                ", fc=" + fc +
                ", ws=" + ws +
                ", fp=" + fp +
                '}';
    }
}
