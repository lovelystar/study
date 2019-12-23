package com.hard.study.dao.oauth;

import java.util.Map;

import com.hard.study.vo.oauth.ResourceVo;
import com.hard.study.vo.oauth.UserInfoVo;

public interface ResourceServerDataDao {
	
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception;
	
	public Map<String, Object> resourceConnection(ResourceVo rVo) throws Exception;
	
	public Map<String, Object> resourceJSON(Integer param, String url, String token) throws Exception;
	
}
