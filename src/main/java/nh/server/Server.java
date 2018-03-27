package nh.server;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.timeout.IdleStateHandler;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class Server {

    public void run(){
        NioEventLoopGroup acceptorGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap
                    .group(acceptorGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            /**
                             * IdleStateHandler: 空闲状态处理器。
                             * 四个参数：1.读空闲； 2.写空闲；3.读写空闲； 4.时间单位。
                             * 所谓的空闲是指多长时间没有发生过对应的时间，就触发调用userEventTriggered方法.
                             */
                            pipeline.addLast(new IdleStateHandler(30,0,0, TimeUnit.SECONDS));
                            //把写的ServerHeartbeatHandler类初始化进去
                            pipeline.addLast(new ServerHeartbeatHandler());
                        }
                    });
            Channel ch = bootstrap.bind(12345).sync().channel();
            System.out.println("服务器已经启动...");
            ch.closeFuture().sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            acceptorGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }

}
