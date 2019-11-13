package com.hard.study.utils;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class RetrofitApiUtil {
	
	private static Retrofit retrofitGson = null;
	private static String gsonUrl = null;
	
	private static Retrofit retrofitJson = null;
	private static String jsonUrl = null;
	
	// 작은 json Data 처리할 때 좋음 ( Gson )
	public static Retrofit retrofitApiGson(String baseUrl) throws Exception {
		
		if(gsonUrl != baseUrl) {
			
			retrofitGson = new Retrofit.Builder()
					.baseUrl(baseUrl)
					.addConverterFactory(GsonConverterFactory.create())
					.build();
			
			gsonUrl = baseUrl;
			
		} else {
			
			if(retrofitGson == null) {
				
				retrofitGson = new Retrofit.Builder()
						.baseUrl(baseUrl)
						.addConverterFactory(GsonConverterFactory.create())
						.build();
				
			}
			
		}
		
		return retrofitGson;
		
	}
	
	// 큰 json Data 처리할 때 좋음 ( Json )
	public static Retrofit retrofitApiJson(String baseUrl) throws Exception {
		
		if(jsonUrl != baseUrl) {
			
			retrofitJson = new Retrofit.Builder()
					.baseUrl(baseUrl)
					.addConverterFactory(JacksonConverterFactory.create())
					.build();
			
			jsonUrl = baseUrl;
			
		} else {
			
			if(retrofitJson == null) {
				
				retrofitJson = new Retrofit.Builder()
						.baseUrl(baseUrl)
						.addConverterFactory(JacksonConverterFactory.create())
						.build();
				
			}
			
		}
		
		return retrofitJson;
		
	}
	
}
