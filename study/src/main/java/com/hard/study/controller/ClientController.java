package com.hard.study.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/client")
public class ClientController {
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@RequestMapping("/")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			restTemplate.getAccessToken();
		}
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("client");
		
		return mav;
		
	}
	
	@RequestMapping("/cpage")
	public ModelAndView clientPage() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("client");
		
		return mav;
		
	}
	
}
