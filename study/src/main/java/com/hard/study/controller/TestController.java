package com.hard.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/test")
public class TestController {
	
	@RequestMapping("/")
	public ModelAndView index() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		
		return mav;
		
	}
	
	@RequestMapping("/tpage")
	public ModelAndView testPage() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		
		return mav;
		
	}
	
}
