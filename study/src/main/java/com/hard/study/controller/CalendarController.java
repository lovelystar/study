package com.hard.study.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.service.oauth.CookieService;
import com.hard.study.service.user.UserService;

@Controller
public class CalendarController {

	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Autowired
	private CookieService cookieService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/calendar", method=RequestMethod.GET)
	public ModelAndView report(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//String accessToken = restTemplate.getAccessToken().toString();
		String username = null;
		Integer gmIdx = 0;
		Integer gIdx = 0;
		
		// client의 기존 인증정보( AccessToken )이 있는지 확인
		// null이면 default value 그대로 적용
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			
		} else {
			
			String accessToken = restTemplate.getAccessToken().toString();
			username = cookieService.getUsernameCookieCheck(request, accessToken, response);
			gmIdx = userService.getGmIdx(username);
			gIdx = userService.getGrIdx(username);
			
		}
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("index");
		mav.addObject("username", username);
		mav.addObject("gmIdx", gmIdx);
		mav.addObject("gIdx", gIdx);
		
		return mav;
	}
}
