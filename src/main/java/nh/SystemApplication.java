package nh;

import nh.server.Server;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

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

}
