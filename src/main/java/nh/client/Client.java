package nh.client;

import com.google.gson.Gson;
import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.*;
import io.netty.channel.ChannelInitializer;
import io.netty.handler.codec.protobuf.ProtobufEncoder;
import io.netty.handler.codec.protobuf.ProtobufVarint32LengthFieldPrepender;
import io.netty.handler.timeout.IdleStateHandler;
import nh.beans.User;
import nh.dto.ClientHttpRequest1;
import nh.dto.ClientHttpRequest2;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;


public class Client {

//    private static Channel ch;
//    private static Bootstrap bootstrap;
//
//    public static void main(String[] args) {
//        NioEventLoopGroup workGroup = new NioEventLoopGroup();
//        try {
//            bootstrap = new Bootstrap();
//            bootstrap
//                    .group(workGroup)
//                    .channel(NioSocketChannel.class)
//                    .handler(new ChannelInitializer<SocketChannel>() {
//                        @Override
//                        protected void initChannel(SocketChannel ch) throws Exception {
//                            ChannelPipeline pipeline = ch.pipeline();
//                            pipeline.addLast(new ProtobufVarint32LengthFieldPrepender());
//                            pipeline.addLast(new ProtobufEncoder());
//                            pipeline.addLast(new IdleStateHandler(0, 5, 0));
//                            pipeline.addLast(new ClientHeartbeatHandler());
//                        }
//                    });
//
//            // 连接服务器
//            doConnect();
//
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        } finally {
//            workGroup.shutdownGracefully();
//        }
//    }
//
//    /**
//     * 抽取出该方法 (断线重连时使用)
//     *
//     * @throws InterruptedException
//     */
//    public static void doConnect() throws InterruptedException {
//        ch = bootstrap.connect("192.168.1.106", 12345).sync().channel();
//    }

    public void connect(String host, int port) throws Exception {
        Gson gson = new Gson();
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            Bootstrap b = new Bootstrap();
            b.group(workerGroup);
            b.channel(NioSocketChannel.class);
            b.option(ChannelOption.SO_KEEPALIVE, true);
            b.handler(new ChannelInitializer<SocketChannel>() {
                @Override
                public void initChannel(SocketChannel ch) throws Exception {
                    // 客户端接收到的是httpResponse响应，所以要使用HttpResponseDecoder进行解码
                    ch.pipeline().addLast(new HttpResponseDecoder());
                    // 客户端发送的是httprequest，所以要使用HttpRequestEncoder进行编码
                    ch.pipeline().addLast(new HttpRequestEncoder());
                    ch.pipeline().addLast(new ClientHeartbeatHandler());
                }
            });

            // Start the client.
            ChannelFuture f = b.connect(host, port).sync();

            URI uri = new URI("http://localhost:12345");
         ClientHttpRequest1 clientHttpRequest1 =new ClientHttpRequest1();
         clientHttpRequest1.setReq(1);
         clientHttpRequest1.setDid("100-110-120-119");
         clientHttpRequest1.setVer("v1.0");
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date date=new Date();
            String currentTime= format.format(date);
            Date beginDate=format.parse(currentTime);
            Date endDate= format.parse("2018-05-01");
            long day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);
            System.out.println("剩余时间是:"+day);
           String msg=gson.toJson(clientHttpRequest1);
            DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.POST,
                    uri.toASCIIString(), Unpooled.wrappedBuffer(msg.getBytes("UTF-8")));

            // 构建http请求
            request.headers().set(HttpHeaders.Names.HOST, host);
            request.headers().set(HttpHeaders.Names.CONNECTION,"CLOSE");
            request.headers().set(HttpHeaders.Names.CONTENT_TYPE,"application/json;charset=utf-8");
//            request.headers().set("CONTENT_LENGTH",18);
            request.headers().set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
            // 发送http请求
            f.channel().write(request);
            f.channel().flush();
            f.channel().closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
        }

    }

    public static void main(String[] args) throws Exception {
        Client client = new Client();
        client.connect("localhost", 12345);
    }

}
