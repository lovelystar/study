package com.hard.study.vo.oauth;

import javax.validation.constraints.NotNull;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.hard.study.vo.common.CommonResult;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NotNull
public class AuthorizationTokenVo extends CommonResult {
	
	@SerializedName("access_token") // json으로 표현할 때 key값을 access_token으로 변경
	@Expose // key, value로 json 제작 중 value가 null이면 자동 생략
	private String accessToken;
	
	@SerializedName("token_type")
	@Expose
	private String tokenType;
	
	@SerializedName("refresh_token")
	@Expose
	private String refreshToken;
	
	@SerializedName("scope")
	@Expose
	private String scope;
	
	public String getAuthorizationString(String token) {
		
		return "Bearer " + new String(token);
		
	}
	
}
