package com.hard.study.service.oauth;

import com.hard.study.dto.oauth.AuthorizationTokenDto;
import com.hard.study.vo.oauth.AuthorizationTokenVo;

public interface AuthorizationTokenService {
	
	public AuthorizationTokenVo getAuthorizationToken (AuthorizationTokenDto tokenDto) throws Exception;
	
}
