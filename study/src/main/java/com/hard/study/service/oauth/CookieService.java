package com.hard.study.service.oauth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CookieService {
	
	// 쿠키 있는지 확인
	public boolean getCookie(HttpServletRequest request) throws Exception;
	
	// username과 cookie체크 + 생성
	public String getUsernameCookieCheck(HttpServletRequest request, String accessToken, HttpServletResponse response) throws Exception;
	
	// 쿠키 토큰 가져오기
	public String getCookieToken (HttpServletRequest request, Map<String,Object> map, HttpServletResponse response) throws Exception;
	
}
