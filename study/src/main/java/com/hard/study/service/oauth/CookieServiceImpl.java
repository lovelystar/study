package com.hard.study.service.oauth;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hard.study.dao.oauth.CookieDao;
import com.hard.study.vo.oauth.UserInfoVo;

@Service("cookieService")
public class CookieServiceImpl implements CookieService {
	
	@Resource(name="cookieDao")
	private CookieDao cookieDao;
	
	@Autowired
	private ResourceServerDataService resourceServerDataService;
	
	// 쿠키 있는지 확인
	@Override
	public boolean getCookie(HttpServletRequest request) throws Exception {
		
		return cookieDao.getCookie(request);
		
	}
	
	// username과 cookie체크 + 생성
	@Override
	public String getUsernameCookieCheck(HttpServletRequest request, String accessToken, HttpServletResponse response) throws Exception {
		
		String username = null;
		Map<String, Object> map = new HashMap<String, Object>();
		UserInfoVo userInfoVo = new UserInfoVo();
		
		map.put("access_token", accessToken);
		
		// access_token으로 resource 서버에 접근하여 데이터 가져오기.
		userInfoVo = resourceServerDataService.getUserInfo(map);
		username = userInfoVo.getUsername();
		
		if(username != null) {
			
			map.put("username", username);
			// accessToken과 cookie에 있는 token 매칭
			cookieDao.checkCookie(request, map, response);
			
		}
		
		return username;
		
	}
	
	@Override
	public String getCookieToken(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response) throws Exception {
		
		return cookieDao.checkCookie(request, map, response);
		
	}
	
}
