package nh;

public class ReturnMsg {
    private Integer code;
    private Object data;
    private String msg;

    public  ReturnMsg(Integer code, Object data, String msg) {

        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public static ReturnMsg success(Integer code, Object data, String msg){

       return new ReturnMsg(code,data,msg);
    }

    public static ReturnMsg err(Integer code,String msg){
        return new ReturnMsg(code,null,msg);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
