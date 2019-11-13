package com.hard.study.service.oauth;

import java.util.Map;

import com.hard.study.vo.oauth.UserInfoVo;

public interface ResourceServerDataService {
	
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception;
	
}
