package com.hard.study.service.oauth;

import java.util.Map;

import com.hard.study.vo.oauth.ResourceVo;
import com.hard.study.vo.oauth.UserInfoVo;

import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ResourceServerDataService {
	
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception;
	
	public Map<String, Object> resourceConnection(ResourceVo rVo) throws Exception;
	
	public Map<String, Object> resourceJSON(@Path("campaignid") Integer param, String url, @Query("access_token") String token) throws Exception;
	
}
