package com.hard.study.dao.oauth;

import java.util.Map;

import com.hard.study.vo.oauth.UserInfoVo;

public interface ResourceServerDataDao {
	
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception;
	
}
