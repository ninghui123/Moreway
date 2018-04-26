package nh.server;

import com.google.gson.Gson;
import io.netty.channel.ChannelInboundHandlerAdapter;
import nh.util.Base64;
import nh.util.DesUtil;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class DataPacket extends ChannelInboundHandlerAdapter {
    private static final String SKEY = "12345678";
    private static final Charset CHARSET = Charset.forName("utf-8");
    Base64 base64 = new Base64();
    Gson gson = new Gson();


    /**
     * 加密数据包
     */
    public String dataPacket(Object object,String skey) {
        String json = gson.toJson(object);
        System.out.println("将对象转成json:" + json);
        String encryptResult = DesUtil.encrypt(json, CHARSET, skey);
        System.out.println("将json进行das加密：" + encryptResult);
        String base = base64.getBase64(encryptResult);
        System.out.println("将das进行base64转码：" + base);
        return base;
    }

    /**
     * 加密密码
     */
    public String encryptionPwd(String password) {
        String encryptResult = DesUtil.encrypt(password, CHARSET, SKEY);
        String base = base64.getBase64(encryptResult);
        return base;
    }

    /**
     * 将密码进行解码
     */
    public String decodePwd(String pwd) {
        String decode = base64.getFromBase64(pwd);
        String obj = null;
        try {
            obj = DesUtil.decrypt(decode, CHARSET, SKEY);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据包解析失败!!!");
        }
        return obj;
    }

    /**
     * 解析数据包
     */
    public Object analysis(String data,String skey) {
        String decode = base64.getFromBase64(data);
        //将解码后的des进行解密
        String obj = null;
        try {
            obj = DesUtil.decrypt(decode, CHARSET, skey);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据包解析失败!!!");
        }
        return obj;
    }


//    public Object packet(Integer datas) {
//        Response902 heartBeat = new Response902();
//        if (datas == 903) {
//            int num = count++;
//            System.out.println("111");
//            heartBeat.setReqType(902);
//            heartBeat.setSn(num);
//            System.out.println(heartBeat.getSn());
//        }
//        return heartBeat;
//    }

    //判断数据包密码
    public Boolean receivePacket(String pwd) {
        String regEx = "^p:.*$";//用正则判断密码是不是p:开头的
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(pwd);
        boolean b = matcher.matches();
        return b;
    }

//    /**
//     * 发送901数据包
//     *
//     * @param data
//     * @return
//     */
//    public Object requestType(ChannelHandlerContext ctx,String data, int counter) throws InterruptedException {
//        DataPacket dataPacket = new DataPacket();
//        Request901 request901 = new Request901();
//        String str = (String) dataPacket.analysis(data);//将接收的数据das解密
//        Map<String,String> map =parseData(str);
//        String reqType=map.get("reqType");
//       if (reqType.equals("901")){
//           Response901 response901 = gson.fromJson(str, Response901.class);
//           String pwd = dataPacket.decodePwd(response901.getPwd());
//           Boolean b = dataPacket.receivePacket(pwd);
//           if (b){
//               request901.setResType(901);
//                request901.setSn(response901.getSn());
//                request901.setState(0);
//                request901.setTm(new Data());
//                request901.setHb(10);
//           }else {
//               request901.setResType(901);
//                request901.setSn(response901.getSn());
//                request901.setState(1);
//                request901.setTm(new Data());
//                request901.setHb(10);
//           }
//       }else if(reqType.equals("903")){
//          dataPacket.type902(ctx,str);
//
//       }else if (reqType.equals("905")){
//
//       }
//        return request901;
//    }
//
//    public void type902(ChannelHandlerContext ctx,String str){
//        Response902 response902 = gson.fromJson(str, Response902.class);
//        Request902 request902=new Request902();
//        DataPacket dataPacket = new DataPacket();
//        request902.setResType(902);
//        request902.setSn(response902.getSn());
//        String base = dataPacket.dataPacket(request902);
//        ByteBuf encoded = Unpooled.copiedBuffer(base.getBytes());
//        System.out.println("sdasd:"+encoded);
//        ctx.write(encoded);
//        ctx.flush();
//    }
}
