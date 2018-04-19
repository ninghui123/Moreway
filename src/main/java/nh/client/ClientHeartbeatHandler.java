package nh.client;


import com.google.gson.Gson;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.*;
import nh.dto.CilentHttpResponse2;
import nh.dto.ClientHttpRequest2;
import nh.dto.ClientHttpRequest3;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import static nh.Ulit.ParseData.parseData;


public class ClientHeartbeatHandler extends ChannelInboundHandlerAdapter {

    Gson gson = new Gson();
    public ClientHeartbeatHandler() {
        super();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof HttpContent) {
            HttpContent httpContent = (HttpContent) msg;
            ByteBuf result =httpContent.content();
            byte[] result1 = new byte[result.readableBytes()];
            result.readBytes(result1);
            String resultStr = new String(result1, "UTF-8");
            System.out.println(resultStr);
            result.release();
           CilentHttpResponse2 cilentHttpResponse2=gson.fromJson(resultStr,CilentHttpResponse2.class);
            if(cilentHttpResponse2.getRes()==1){
                String token=cilentHttpResponse2.getToken();
                URI uri = new URI("/user/login");
                ClientHttpRequest2 clientHttpRequest2=new ClientHttpRequest2();
                clientHttpRequest2.setReq(2);
                clientHttpRequest2.setDid("100-110-120-119");
                clientHttpRequest2.setPwd(token);
                clientHttpRequest2.setVer("v1.0");
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date date=new Date();
            String currentTime= format.format(date);
            Date beginDate=format.parse(currentTime);
            Date endDate= format.parse("2018-05-01");
            long day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);
            System.out.println("剩余时间是:"+day);
                String str=gson.toJson(clientHttpRequest2);
                DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.POST,
                        uri.toASCIIString(), Unpooled.wrappedBuffer(str.getBytes("UTF-8")));

                // 构建http请求
                request.headers().set(HttpHeaders.Names.HOST, "localhost");
                request.headers().set(HttpHeaders.Names.CONNECTION,"CLOSE");
                request.headers().set(HttpHeaders.Names.CONTENT_TYPE,"application/json;charset=utf-8");
//            request.headers().set("CONTENT_LENGTH",18);
                request.headers().set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
                // 发送http请求
                ctx.writeAndFlush(request);
            }else if(cilentHttpResponse2.getRes()==2){
                URI uri = new URI("/user/login2");
                ClientHttpRequest3 clientHttpRequest3=new ClientHttpRequest3();
                clientHttpRequest3.setReq(3);
                clientHttpRequest3.setDid("100-110-120-119");
                clientHttpRequest3.setFault(1);
               clientHttpRequest3.setFlow(1000);
               clientHttpRequest3.setRs(4);
               clientHttpRequest3.setT(100);
               clientHttpRequest3.setTdsi(999);
               clientHttpRequest3.setTdso(999);
               clientHttpRequest3.setToken(cilentHttpResponse2.getToken());
               clientHttpRequest3.setUs(1);
               clientHttpRequest3.setDbg(1);
                String str=gson.toJson(clientHttpRequest3);
                DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.POST,
                        uri.toASCIIString(), Unpooled.wrappedBuffer(str.getBytes("UTF-8")));
                // 构建http请求
                request.headers().set(HttpHeaders.Names.HOST, "localhost");
                request.headers().set(HttpHeaders.Names.CONNECTION,"CLOSE");
                request.headers().set(HttpHeaders.Names.CONTENT_TYPE,"application/json;charset=utf-8");
//            request.headers().set("CONTENT_LENGTH",18);
                request.headers().set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
                // 发送http请求
                ctx.writeAndFlush(request);
            }

        }
    }
}
