package com.hard.study.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.service.oauth.ResourceServerDataService;
import com.hard.study.vo.oauth.ResourceVo;

@RestController
public class OAuthResourceController {
	
	@Autowired
	private ResourceServerDataService resourceServerDataService;
	
	@RequestMapping(value="/gettestapi", method={RequestMethod.POST})
	public String getTestApi() throws Exception {
		
		return "test api";
		
	}
	
	@RequestMapping(value="/resourceconnection", method={RequestMethod.GET, RequestMethod.POST})
	public Map<String, Object> resourceConnection(@ModelAttribute ResourceVo rVo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		System.out.println("resource connection getUrl = " + rVo.getUrl());
		System.out.println("resource connection getNum = " + rVo.getNum());
		System.out.println("resource connection getToken = " + rVo.getToken());
		
		resultMap = resourceServerDataService.resourceConnection(rVo);
		
		System.out.println("resultMap = " + resultMap);
		return resultMap;
		
	}
	
	@RequestMapping(value="/resourcejson", method={RequestMethod.GET, RequestMethod.POST})
	public Map<String, Object> resourceJSON(@ModelAttribute ResourceVo rVo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		System.out.println("resource json getUrl = " + rVo.getUrl());
		System.out.println("resource json getNum = " + rVo.getNum());
		System.out.println("resource json getToken = " + rVo.getToken());
		
		resultMap = resourceServerDataService.resourceJSON(rVo.getParam(), rVo.getUrl(), rVo.getToken());
		
		System.out.println("resultMap = " + resultMap);
		return resultMap;
		
	}
	
}
