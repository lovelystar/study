package com.hard.study.service.oauth;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.oauth.ResourceServerDataDao;
import com.hard.study.vo.oauth.ResourceVo;
import com.hard.study.vo.oauth.UserInfoVo;

@Service("resourceServerDataService")
public class ResourceServerDataServiceImpl implements ResourceServerDataService {
	
	@Resource(name="resourceServerDataDao")
	private ResourceServerDataDao resourceServerDataDao;
	
	@Override
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception {
		
		return resourceServerDataDao.getUserInfo(authMap);
		
	}
	
	@Override
	public Map<String, Object> resourceConnection(ResourceVo rVo) throws Exception {
		
		return resourceServerDataDao.resourceConnection(rVo);
		
	}
	
	@Override
	public Map<String, Object> resourceJSON(Integer param, String url, String token) throws Exception {
		
		System.out.println("serviceImpl param = " + param);
		System.out.println("serviceImpl url = " + url);
		System.out.println("serviceImpl token = " + token);
		
		return resourceServerDataDao.resourceJSON(param, url, token);
		
	}
	
}
