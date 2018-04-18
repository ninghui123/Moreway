package nh.dto;
//第二次响应
public class CilentHttpResponse2 {
    private Integer res;//响应类型
    private  Integer state;//登录状态
    private  String token;//通信令牌

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
