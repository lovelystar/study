package com.hard.study.service.oauth;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.oauth.ResourceServerDataDao;
import com.hard.study.vo.oauth.UserInfoVo;

@Service("resourceServerDataService")
public class ResourceServerDataServiceImpl implements ResourceServerDataService {
	
	@Resource(name="resourceServerDataDao")
	private ResourceServerDataDao resourceServerDataDao;
	
	@Override
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception {
		
		return resourceServerDataDao.getUserInfo(authMap);
		
	}
	
}
