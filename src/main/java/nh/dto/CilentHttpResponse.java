package nh.dto;
//设备第一次响应
public class CilentHttpResponse {
  private Integer res;//响应类型
  private Integer state;//登录状态
  private String c;//挑战字符串

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

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }
}
