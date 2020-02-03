package com.hard.study.utils.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

// "/login"링크를 탔을 때 해당 인터셉터 연결
// "/login"링크 연결은 ClientWebMVCConfig에 해둠.
// 순서 = pre >> post >> after
public class LoginInterceptorUtil extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse reponse, Object handler) throws Exception {
		
		//System.out.println("login interceptor destination = " + request.getSession().getAttribute("destination"));
		return true;
		
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView mav) throws Exception {
		
		System.out.println("postHandle");
		
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse reponse, Object handler, Exception e) throws Exception {
		
		System.out.println("afterCompletion");
		
	}
	
}
