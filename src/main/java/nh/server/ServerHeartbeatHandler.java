package nh.server;

import com.google.gson.Gson;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleStateEvent;
import nh.dto.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Map;

import static nh.Ulit.ParseData.parseData;


@Component
public class ServerHeartbeatHandler extends ChannelInboundHandlerAdapter {
    private static final String SKEY = "12345678";
    DataPacket dataPacket = new DataPacket();
    Gson gson = new Gson();

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("---客户端连接成功---");
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("---退出连接---");
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {

        ByteBuf result = (ByteBuf) msg;
        byte[] result1 = new byte[result.readableBytes()];
        // msg中存储的是ByteBuf类型的数据，把数据读取到byte[]中
        result.readBytes(result1);
        String resultStr = new String(result1, "GBK");
        result.release();
        send(ctx, resultStr);
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            // 空闲30s之后触发 (心跳包丢失)
            ctx.channel().close().sync();
            System.out.println("没有收到心跳，已与客户端自动断开连接");
        }
    }


    public void send(ChannelHandlerContext ctx, String string) throws InterruptedException {
        Request901 request901 = new Request901();
        String str = (String) dataPacket.analysis(string,"12345678");//将接收的数据das解密
        Map<String, String> map = parseData(str);
        String reqType = map.get("reqType");
        if (reqType.equals("903")) {
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
}
