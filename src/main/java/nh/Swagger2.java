package nh;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class Swagger2 {
    @Bean
    public Docket createRestApi() {
        ApiInfo apiInfo = new ApiInfoBuilder()
                //页面标题
                .title("项目rest接口测试")
                //描述
                .description("净水机管理")
                //你的大名，你的url，你的email
                .contact(new Contact("宁辉", "", ""))
                //版本号
                .version("V1.0")
                .build();
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo)
                .select()
                //你的包名路径
                .apis(RequestHandlerSelectors.basePackage("nh.controller"))
                .paths(PathSelectors.any())
                .build();
    }
}
