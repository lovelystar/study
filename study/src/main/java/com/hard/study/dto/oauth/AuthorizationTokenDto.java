package com.hard.study.dto.oauth;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

// lombok 사용
@Getter
@Setter
@NotNull
public class AuthorizationTokenDto {
	
	private String state;
	private String code;
	private String grantType;
	private String baseUrl;
	private String redirectUrl;
	private String scope;
	
}
