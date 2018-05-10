package nh;

import nh.server.Server;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import javax.servlet.MultipartConfigElement;

@SpringBootApplication
@ServletComponentScan
@EnableCaching
@EnableScheduling
public class SystemApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(SystemApplication.class, args);
	}


    @Override
    public void run(String... args) throws Exception {
        new Server().run();
}

    /**
     * 设置上传文件大小
     * @return
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize("1000MB");
        factory.setMaxRequestSize("1000MB");
        return factory.createMultipartConfig();
    }
}
