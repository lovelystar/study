package com.hard.study.dao.oauth;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.hard.study.dto.oauth.AuthorizationTokenDto;
import com.hard.study.service.retrofit.RetrofitApiService;
import com.hard.study.utils.RetrofitApiUtil;
import com.hard.study.vo.oauth.AuthorizationTokenVo;

import retrofit2.Call;

@Repository("authorizationTokenDao")
public class AuthorizationTokenDaoImpl implements AuthorizationTokenDao {
	
	@Autowired
	private Environment env;
	
	@Override
	public AuthorizationTokenVo getAuthorizationToken(AuthorizationTokenDto tokenDto) throws Exception {
		
		// Retrofit
		// 다른 서버에 데이터를 요청하기 위해서 사용한다.
		// 기본적으로 OKHttp에 의존하고 있고 OKHttp 위에서 돈다.
		// TypeSafe한 HttpClient 라이브러리.
		// TypeSafe = return 값을 내가 필요한 형태의 객체로 받을 수 있다는 의미
		// RetrofitApiService로 이동.
		RetrofitApiService retrofitApiService = RetrofitApiUtil.retrofitApiGson(tokenDto.getBaseUrl()).create(RetrofitApiService.class);
		
		String authStr = env.getProperty("security.oauth2.client.id") + ":" + env.getProperty("security.oauth2.client.client-secret");
		byte[] encodedAuth = Base64.encodeBase64(authStr.getBytes(StandardCharsets.UTF_8));
		String authHeader = "Basic " + new String(encodedAuth);
		
		Map<String, Object> authTokenMap = new HashMap<String, Object>();
		
		authTokenMap.put("grant_type", tokenDto.getGrantType());
		authTokenMap.put("code", tokenDto.getCode());
		authTokenMap.put("redirect_uri", tokenDto.getRedirectUrl());
		authTokenMap.put("scope", tokenDto.getScope());
		authTokenMap.put("state", tokenDto.getState());
		
		Call<AuthorizationTokenVo> call = retrofitApiService.callAuthorizationToken(authHeader, authTokenMap);
		
		return call.execute().body();
		
	}
	
	@Override
	public void oauthServerLogout(AuthorizationTokenDto tokenDto) throws Exception {
		
		RetrofitApiService retrofitApiService = RetrofitApiUtil.retrofitApiGson(tokenDto.getBaseUrl()).create(RetrofitApiService.class);
		
		String authStr = env.getProperty("security.oauth2.client.id") + ":" + env.getProperty("security.oauth2.client.client-secret");
		byte[] encodedAuth = Base64.encodeBase64(authStr.getBytes(StandardCharsets.UTF_8));
		String authHeader = "Basic " + new String(encodedAuth);
		
		Call<Void> call = retrofitApiService.oauthServerLogout(authHeader);
		
		call.execute().body();
		
	}
	
}
