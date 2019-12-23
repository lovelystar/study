package com.hard.study.dao.oauth;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.hard.study.service.retrofit.RetrofitApiService;
import com.hard.study.utils.RetrofitApiUtil;
import com.hard.study.vo.oauth.AuthorizationTokenVo;
import com.hard.study.vo.oauth.ResourceVo;
import com.hard.study.vo.oauth.UserInfoVo;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

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
		String bearerToken = tokenVo.getAuthorizationString(authMap.get("access_token").toString());
		
		RetrofitApiService retrofitApiService = RetrofitApiUtil.retrofitApiGson(authMap.get("baseUrl").toString()).create(RetrofitApiService.class);
		Call<UserInfoVo> call = retrofitApiService.callUserInfo(bearerToken);
		
		return call.execute().body();
		
	}
	
	@Override
	public Map<String, Object> resourceConnection(ResourceVo rVo) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> rest = new HashMap<String, Object>();
		
		rest.put("callApi", rVo.getUrl());
		rest.put("token", rVo.getToken());
		
		try {
			
			URL url;
			InputStream is = null;
			String access_token = rest.get("token").toString();
			
			Calendar calendar = Calendar.getInstance();
			Integer num = rVo.getNum();
			
			for(int i=0; i<=num; i++) {
				
				try {
					
					url = new URL(rest.get("callApi").toString() + "?access_token=" + access_token);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					is = conn.getInputStream();
					
				} catch(Exception e) {
					
					e.printStackTrace();
					
				}
				
				StringBuffer buffer = new StringBuffer();
				Scanner scan = new Scanner(is, "UTF-8");
				
				while(scan.hasNextLine()) {
					buffer.append(scan.nextLine());
				}
				
				Object obj = buffer;
				List<Object> resultList = new ArrayList<Object>();
				resultList.add(obj);
				result.put("result", resultList);
				is.close();
				scan.close();
				
			}
			
			return result;
			
		} catch(Exception e) {
			
			throw new Exception();
			
		}
		
	}
	
	@Override
	public Map<String, Object> resourceJSON(Integer param, String url, String token) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		Retrofit retrofit = new Retrofit
				.Builder()
				.baseUrl(url)
				.addConverterFactory(JacksonConverterFactory.create())
				.build();
		
		RetrofitApiService retrofitApiService = retrofit.create(RetrofitApiService.class);
		Call<Map<String, Object>> call = retrofitApiService.resourceJSON(param, token);
		
		result = call.execute().body();
		
		return result;
		
	}
	
}
