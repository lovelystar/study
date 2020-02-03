package com.hard.study.service.oauth;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.hard.study.dao.oauth.CookieDao;
import com.hard.study.vo.oauth.UserInfoVo;

@Service("cookieService")
public class CookieServiceImpl implements CookieService {

	@Autowired
	private OAuth2RestOperations restTemplate;
	
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
		
		// access token이 만료됐을 때
		// cookie 가져와서 값을 비교하여 suminToken이라는 값을 가지고 있는 cookie를 삭제
		if(userInfoVo == null) {
			
			Cookie[] cookies = request.getCookies();
			for(Cookie cookie:cookies) {
				if(cookie.getValue().contains("suminToken")) {
					
					String cookieName = cookie.getName();
					Cookie tokenCookie = WebUtils.getCookie(request, cookieName);
					tokenCookie.setPath("/study");
					tokenCookie.setMaxAge(0);
					
					response.addCookie(tokenCookie);
					
				}
			}
			
			restTemplate.getOAuth2ClientContext().setAccessToken(null);
			
		} else {

			username = userInfoVo.getUsername();
			
			if(username != null) {
				
				map.put("username", username);
				// accessToken과 cookie에 있는 token 매칭
				cookieDao.checkCookie(request, map, response);
				
			}
			
		}
		
		return username;
		
	}
	
	@Override
	public String getCookieToken(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response) throws Exception {
		
		return cookieDao.checkCookie(request, map, response);
		
	}
	
}
