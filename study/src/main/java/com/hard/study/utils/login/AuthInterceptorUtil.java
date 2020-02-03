package com.hard.study.utils.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthInterceptorUtil extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {

		String uri = request.getRequestURI();
		String query = request.getQueryString();
		String method = request.getMethod();
		// StringBuffer url = request.getRequestURL();
		
		if(query == null || query.equals("null") || query.equals("")) {
			
			query = "";
			
		} else {
			
			query = "?" + query;
			
		}
		
		if(method.toUpperCase().equals("GET")) {
			
			request.getSession().setAttribute("destination", uri + query);
			
		}
		
		return true;
		
	}
	
}
