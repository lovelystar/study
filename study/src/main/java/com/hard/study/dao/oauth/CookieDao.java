package com.hard.study.dao.oauth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CookieDao {
	
	// 쿠키 있는지 확인
	public boolean getCookie(HttpServletRequest request) throws Exception;
	
	// accessToken과 cookie에 있는 token 매칭
	public String checkCookie(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response) throws Exception;
	
}
