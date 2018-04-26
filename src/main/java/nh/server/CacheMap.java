package nh.server;



import org.springframework.scheduling.annotation.Scheduled;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CacheMap {
    private static Map<String, String> map = new ConcurrentHashMap<>();

    public static void addToken(String token){
        map.put("tokenId",token);
    }

    @Scheduled(cron = "0 0 0/1 * * ?")
    private static void removeToken(){
        map.remove("tokenId");
    }


    public static  String getToken(){
       if(map.get("tokenId")!=null&&!map.get("tokenId").equals("")){
           return map.get("tokenId");
       }else {
           return null;
       }
    }

}
