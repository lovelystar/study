package com.hard.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="client")
public class ClientController {

	@RequestMapping("/")
	public ModelAndView main() throws Exception {
		
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
