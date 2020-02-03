package com.hard.study.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.WebUtils;

import com.hard.study.service.oauth.CookieService;
import com.hard.study.vo.oauth.UserInfoVo;

@Controller
public class LoginController {
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Autowired
	private CookieService cookieService;
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		
		// redirect 경로 세팅
		String destination = request.getSession().getAttribute("destination").toString();
		Cookie cookie = new Cookie("dest", destination);
		cookie.setMaxAge(15); // 15초
		cookie.setSecure(false);
		cookie.setHttpOnly(true);
		cookie.setPath("/study");
		response.addCookie(cookie);
		
		System.out.println("destination = " + destination);
		
		String accessToken = restTemplate.getAccessToken().toString();
		if(accessToken != null) {
			restTemplate.getOAuth2ClientContext().setAccessToken(new DefaultOAuth2AccessToken(accessToken));
		}
		
		System.out.println("accessToken = " + accessToken);
		System.out.println("rest get access = " + restTemplate.getOAuth2ClientContext().getAccessToken());
		
		// 로그인 후 redirect
		// client의 기존 인증정보( AccessToken )이 있는지 확인
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			System.out.println("restTemplate.getOAuth2ClientContext의 accessToken이 null이라 쿠키 확인합니다..");
			// accessToken이 없는 경우 쿠키가 있는지 확인
			// 쿠키 정보도 없으면
			if(!cookieService.getCookie(request)) { 
				
				System.out.println("restTemplate.getOAuth2ClientContext의 accessToken이 null이고, 쿠키가 없으니 resource서버 접근");
				// restTemplate의 resource를 가지고 동작한다. + 로그인이 되면 db의 redirect url로 이동
				restTemplate.getAccessToken();
				
			}
			
		}
		
		RedirectView redirect = new RedirectView(destination);
		mav.setView(redirect);
		
		return mav;
		
	}
	
}
