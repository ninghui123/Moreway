package nh.server;

import com.google.gson.Gson;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.*;
import io.netty.handler.timeout.IdleStateEvent;
import nh.beans.Equipment;
import nh.dto.*;
import nh.service.EquipmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import static nh.util.ParseData.parseData;


@Component
public class ServerHeartbeatHandler extends ChannelInboundHandlerAdapter {

    private static final Logger log = LoggerFactory.getLogger(Server.class);

    private static final String SKEY = "12345678";
    DataPacket dataPacket = new DataPacket();
    Gson gson = new Gson();
    private String token;

    @Autowired
    EquipmentService equipmentService;


    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        String uuid=ctx.channel().id().asLongText();
        GatewayService.addGatewayChannel(uuid,(SocketChannel) ctx.channel());
        log.error("---客户端连接成功---");
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        log.error("---退出连接---");
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof HttpRequest){
            HttpRequest httpRequest= (HttpRequest) msg;
            //判断请求状态为POST
            if(!HttpMethod.POST.equals(httpRequest.method())){
                ctx.channel().close().sync();
            }
        }
         if (msg instanceof HttpContent){
            HttpContent httpContent= (HttpContent) msg;
             ByteBuf result=httpContent.content();
             byte[] result1 = new byte[result.readableBytes()];
             result.readBytes(result1);
             String resultStr = new String(result1, "UTF-8");
             System.out.println(resultStr);
             ServerHttpRequest serverHttpRequest=gson.fromJson(resultStr,ServerHttpRequest.class);
             System.out.println(serverHttpRequest.toString());
             result.release();
             if (serverHttpRequest.getReq()==1){
                 HttpResponseStatus status = HttpResponseStatus.valueOf(200);
               CilentHttpResponse cilentHttpResponse =new CilentHttpResponse();
               cilentHttpResponse.setRes(1);
               cilentHttpResponse.setState(0);
              token=UUID.randomUUID().toString();
               cilentHttpResponse.setC(token);
                 String base=gson.toJson(cilentHttpResponse);
                 FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
//             response.headers().set("Content-Length",18);
                 //设置数据类型
                 response.headers().set("Content-Type","application/json;charset=utf-8");
                 ctx.writeAndFlush(response);
             }if (serverHttpRequest.getReq()==2){
                 String pwd=serverHttpRequest.getPwd();
                 if (token.equals(token)){
                     HttpResponseStatus status = HttpResponseStatus.valueOf(200);
                       CilentHttpResponse2 cilentHttpResponse2=new CilentHttpResponse2();
                       cilentHttpResponse2.setRes(2);
                       cilentHttpResponse2.setState(0);
                       String tokens=UUID.randomUUID().toString();
                       CacheMap.addToken(token);
                       cilentHttpResponse2.setToken(tokens);
                     String base=gson.toJson(cilentHttpResponse2);
                     System.out.println(base);
                     FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
                     response.headers().set("Content-Type","application/json;charset=utf-8");
                     ctx.writeAndFlush(response);
                 }else {
                     HttpResponseStatus status = HttpResponseStatus.valueOf(200);
                     CilentHttpResponse2 cilentHttpResponse2=new CilentHttpResponse2();
                     cilentHttpResponse2.setRes(2);
                     cilentHttpResponse2.setState(1);
                     String tokens=UUID.randomUUID().toString();
                     cilentHttpResponse2.setToken(tokens);
                     String base=gson.toJson(cilentHttpResponse2);
                     FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
                     response.headers().set("Content-Type","application/json;charset=utf-8");
                     ctx.writeAndFlush(response);
                 }
             }if(serverHttpRequest.getReq()==3){
                 String token = serverHttpRequest.getToken();
                 Equipment equipment=equipmentService.httpResponse(serverHttpRequest.getDid());
                 SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                 Date date=new Date();
                 String currentTime= format.format(date);
                 String stopTime=format.format(equipment.getStopTime());
                 Date beginDate=format.parse(currentTime);
                 Date endDate= format.parse(stopTime);
                 long tlDay=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);
                 String filterStopTime=format.format(equipment.getFilterStopTime());
                 Date filterDndDate=format.parse(filterStopTime);
                 long fsDay=(filterDndDate.getTime()-beginDate.getTime())/(24*60*60*1000);
                 if (tlDay>0){
                     if(CacheMap.getToken().equals(token)&&CacheMap.getToken()!=null){
                         HttpResponseStatus status = HttpResponseStatus.valueOf(200);
                        String responseId =equipment.getResponseId();
                         CilentHttpResponse3 cilentHttpResponse3=gson.fromJson(responseId,CilentHttpResponse3.class);
                         cilentHttpResponse3.setPc(1);
                         cilentHttpResponse3.setTl((int) tlDay);
                         cilentHttpResponse3.setFs((int) fsDay);
                         String base=gson.toJson(cilentHttpResponse3);
                         FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
                         response.headers().set("Content-Type","application/json;charset=utf-8");
                         ctx.writeAndFlush(response);
                     }else {
                         HttpResponseStatus status = HttpResponseStatus.valueOf(200);
                         String responseId =equipment.getResponseId();
                         CilentHttpResponse3 cilentHttpResponse3=gson.fromJson(responseId,CilentHttpResponse3.class);
                         cilentHttpResponse3.setPc(1);
                         cilentHttpResponse3.setState(1);
                         cilentHttpResponse3.setTl((int) tlDay);
                         cilentHttpResponse3.setFs((int) fsDay);
                         String base=gson.toJson(cilentHttpResponse3);
                         FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
                         response.headers().set("Content-Type","application/json;charset=utf-8");
                         ctx.writeAndFlush(response);
                     }
                 }else {
                     HttpResponseStatus status = HttpResponseStatus.valueOf(200);
                     String responseId =equipment.getResponseId();
                     CilentHttpResponse3 cilentHttpResponse3=gson.fromJson(responseId,CilentHttpResponse3.class);
                     cilentHttpResponse3.setFs(0);
                     cilentHttpResponse3.setPc(0);
                     cilentHttpResponse3.setTl(0);
                     String base=gson.toJson(cilentHttpResponse3);
                     FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,status,Unpooled.copiedBuffer(base.getBytes()));
                     response.headers().set("Content-Type","application/json;charset=utf-8");
                     ctx.writeAndFlush(response);
                 }
             }
         }
//        String uuid = ctx.channel().id().asLongText();
//        GatewayService.addGatewayChannel(uuid, (SocketChannel)ctx.channel());
//        String body= (String) msg;
//        System.out.println(body);
//        ByteBuf result = (ByteBuf) msg;
//        // msg中存储的是ByteBuf类型的数据，把数据读取到byte[]中
//        send(ctx, resultStr);
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            // 空闲30s之后触发 (心跳包丢失)
            ctx.channel().close().sync();
            System.out.println("没有收到心跳，已与客户端自动断开连接");
        }
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
    }

    public void send(ChannelHandlerContext ctx, String string) throws InterruptedException {
        Request901 request901 = new Request901();
        String str = (String) dataPacket.analysis(string,"12345678");//将接收的数据das解密
        System.out.println(str);
        Map<String, String> map = parseData(str);
        String reqType = map.get("reqType");
        if (reqType.equals("901")) {
            Response901 response901 = gson.fromJson(str, Response901.class);
            String pwd = dataPacket.decodePwd(response901.getPwd());
            Boolean b = dataPacket.receivePacket(pwd);
            if (b) {
                request901.setResType(901);
                request901.setSn(response901.getSn());
                request901.setState(0);
                request901.setTm(new Date());
                request901.setHb(10);
                String base = dataPacket.dataPacket(request901,SKEY);
                ByteBuf encoded = Unpooled.copiedBuffer(base.getBytes());
                ctx.write(encoded);
                ctx.flush();
            } else {
                request901.setResType(901);
                request901.setSn(response901.getSn());
                request901.setState(1);
                request901.setTm(new Date());
                request901.setHb(10);
                String base = dataPacket.dataPacket(request901,SKEY);
                ByteBuf encoded = Unpooled.copiedBuffer(base.getBytes());
                ctx.write(encoded);
                ctx.flush();
                ctx.channel().close().sync();
            }
        } else if (reqType.equals("902")) {
            Response902 response902 = gson.fromJson(str, Response902.class);
            Request902 request902 =new Request902();
            request902.setResType(902);
            request902.setSn(response902.getSn());
            String base = dataPacket.dataPacket(request902,SKEY);
            ByteBuf encoded = Unpooled.copiedBuffer(base.getBytes());
            ctx.write(encoded);
            ctx.flush();
        } else if (reqType.equals("905")) {
            Response905 response905=gson.fromJson(str,Response905.class);
            Request905 request905=new Request905();
            request905.setResType(905);
            request905.setSn(response905.getSn());
            request905.setState(0);
            String base=dataPacket.dataPacket(request905,SKEY);
            ByteBuf encoded=Unpooled.copiedBuffer(base.getBytes());
            ctx.write(encoded);
            ctx.flush();
        }
    }

    public  void   test(){
        try {
            Map<String, SocketChannel> map = GatewayService.getChannels();
            Iterator<String> it = map.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();
                SocketChannel obj = map.get(key);
                System.out.println("channel id is: " + key);
                System.out.println("channel: " + obj.isActive());
                String base="hello, it is Server test header ping";
                ByteBuf encoded=Unpooled.copiedBuffer(base.getBytes());
                obj.writeAndFlush(encoded);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
