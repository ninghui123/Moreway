package nh.beans;

public class Page {
    private Integer pageNext;
    private  Integer pageSize;

    public Integer getPageNext() {
        return pageNext;
    }

    public void setPageNext(Integer pageNext) {
        this.pageNext =pageNext==1?pageNext-1:pageNext*pageSize-pageSize;
    }


    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }


}
