package com.hard.study.dao.oauth;

import com.hard.study.dto.oauth.AuthorizationTokenDto;
import com.hard.study.vo.oauth.AuthorizationTokenVo;

public interface AuthorizationTokenDao {
	
	public AuthorizationTokenVo getAuthorizationToken(AuthorizationTokenDto tokenDto) throws Exception;
	
	public void oauthServerLogout(AuthorizationTokenDto tokenDto) throws Exception;
	
}
