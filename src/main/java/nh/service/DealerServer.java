package nh.service;

import nh.beans.Dealer;
import nh.beans.Page;

import java.util.List;

public interface DealerServer {

   List<Dealer> list(Page page);
   void add(Dealer dealer);
   Integer count();
   void update(Dealer dealer);
   Dealer listOne(String id);
   void delete(String id);

}
