package nh.dto;

/**
 * 请求数据906类型（固件更新请求）
 */
public class Response906 {
    private Integer reqType;
    private Integer sn;
    private  String url;
    private Integer le;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getLe() {
        return le;
    }

    public void setLe(Integer le) {
        this.le = le;
    }

    @Override
    public String toString() {
        return "Response906{" +
                "reqType=" + reqType +
                ", sn=" + sn +
                ", url='" + url + '\'' +
                ", le=" + le +
                '}';
    }
}
