package nh.service.impl;

import nh.beans.Dealer;
import nh.beans.Page;
import nh.dao.DealerMapper;
import nh.service.DealerServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class DealerServerImpl implements DealerServer {
    @Autowired
    DealerMapper dealerMapper;

    @Override
    public List<Dealer> list(Page page) {
        return dealerMapper.list(page);
    }

    @Override
    @Transactional
    public void add(Dealer dealer) {
        dealer.setId(UUID.randomUUID().toString());
        dealer.setCreateTime(new Date());
        dealer.setUpdateTime(new Date());
           dealerMapper.add(dealer);
    }

    @Override
    public Integer count() {
        return dealerMapper.count();
    }

    @Override
    @Transactional
    public void update(Dealer dealer) {
        dealerMapper.update(dealer);
    }

    @Override
    public Dealer listOne(String id) {
        return dealerMapper.listOne(id);
    }

    @Override
    @Transactional
    public void delete(String id) {
         dealerMapper.delete(id);
    }
}
