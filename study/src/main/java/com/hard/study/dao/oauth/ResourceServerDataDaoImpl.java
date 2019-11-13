package com.hard.study.dao.oauth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.hard.study.service.retrofit.RetrofitApiService;
import com.hard.study.utils.RetrofitApiUtil;
import com.hard.study.vo.oauth.AuthorizationTokenVo;
import com.hard.study.vo.oauth.UserInfoVo;

import retrofit2.Call;

@Repository("resourceServerDataDao")
public class ResourceServerDataDaoImpl implements ResourceServerDataDao {
	
	@Autowired
	private Environment env;
	
	public UserInfoVo getUserInfo(Map<String, Object> authMap) throws Exception {
		
		String resourceBaseUrl = env.getProperty("config.oauth2.resource-base-uri");
		
		// ClientController에서 세팅한 access_token도 같이 들어있다.
		authMap.put("baseUrl", resourceBaseUrl);
		
		AuthorizationTokenVo tokenVo = new AuthorizationTokenVo();
		
		// AuthorizationTokenVo에서 getAuthorizationString(tokenValue);를 호출하면 Bearer를 자동으로 붙이도록 세팅해 둠.
		String BearerToken = tokenVo.getAuthorizationString(authMap.get("access_token").toString());
		
		RetrofitApiService retrofitApiService = RetrofitApiUtil.retrofitApiGson(authMap.get("baseUrl").toString()).create(RetrofitApiService.class);
		Call<UserInfoVo> call = retrofitApiService.callUserInfo(BearerToken);
		
		return call.execute().body();
		
	}
	
}
