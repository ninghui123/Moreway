package nh.dto;

import javax.xml.crypto.Data;
import java.util.Date;

/**
 * 定时时段数组项描述
 */
public class Timing {
 private Integer en;//使能标志
 private Date t;

    public Integer getEn() {
        return en;
    }

    public void setEn(Integer en) {
        this.en = en;
    }

    public Date getT() {
        return t;
    }

    public void setT(Date t) {
        this.t = t;
    }

    @Override
    public String toString() {
        return "Timing{" +
                "en=" + en +
                ", t=" + t +
                '}';
    }
}
