package com.hard.study.service.oauth;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.oauth.AuthorizationTokenDao;
import com.hard.study.dto.oauth.AuthorizationTokenDto;
import com.hard.study.vo.oauth.AuthorizationTokenVo;

@Service("authorizationTokenService")
public class AuthorizationTokenServiceImpl implements AuthorizationTokenService {
	
	@Resource(name="authorizationTokenDao")
	private AuthorizationTokenDao authorizationTokenDao;
	
	@Override
	public AuthorizationTokenVo getAuthorizationToken(AuthorizationTokenDto tokenDto) throws Exception {
		
		return authorizationTokenDao.getAuthorizationToken(tokenDto);
		
	}
	
}
