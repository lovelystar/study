package com.hard.study.service.retrofit;

import java.util.Map;

import com.hard.study.vo.oauth.AuthorizationTokenVo;
import com.hard.study.vo.oauth.UserInfoVo;

import retrofit2.Call;
import retrofit2.http.FieldMap;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.POST;

// 실질적으로 다른서버에 데이터 요청하는 부분
public interface RetrofitApiService {
	
	// 기본적으로 GET, POST, DELETE, PUT을 지원.
	// 내가 되돌려 받을 반환 타입은 Call<객체>의 형태로 기술해야 한다.
	@FormUrlEncoded
	@POST("studyoauthserver/oauth/token")
	Call<AuthorizationTokenVo> callAuthorizationToken(@Header("Authorization") String authHeader, @FieldMap Map<String, Object> authTokenMap) throws Exception;
	
	// resource 서버에 접근해서 데이터 호출
//	@FormUrlEncoded // 해당 어노테이션은 반드시 @Field 어노테이션과 함께 써야 한다.
	@POST("studyresourceserver/authenticated/username")
	Call<UserInfoVo> callUserInfo(@Header("Authorization") String bearerToken) throws Exception;
	
	// 로그아웃은 ".../logout"으로 요청되고 기본적으로 POST
	@POST("studyoauthserver/logout")
	Call<Void> oauthServerLogout(@Header("Authorization") String authHeader) throws Exception;
	
}
