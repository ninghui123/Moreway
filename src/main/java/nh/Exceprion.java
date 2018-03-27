package nh;

public enum Exceprion {
    ERROR("3000","查询错误"),
    USERPWD_ERROR("3001","账号密码错误"),
    UN_ERROR("3002","未知错误");


    private String code;
    private String msg;

    Exceprion(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
