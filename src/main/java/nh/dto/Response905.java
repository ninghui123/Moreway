package nh.dto;

/**
 * 请求数据905类型(推送请求)
 */
public class Response905 {
  private Integer reqType;//请求类型
  private Integer sn;//请求序号
  private Integer code;//推送代码

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

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "Response905{" +
                "reqType=" + reqType +
                ", sn=" + sn +
                ", code=" + code +
                '}';
    }
}
