package com.hard.study.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.dto.websocket.WebSocketDto;

@Controller
public class WebSocketController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@RequestMapping(value="/clientws", method=RequestMethod.GET)
	public ModelAndView clientWebSocketEvent() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("clientws");
		
		return mav;
		
	}
	
	@RequestMapping(value="/resourcews", method=RequestMethod.GET)
	public ModelAndView resourceWebSocketEvent() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("resourcews");
		
		return mav;
		
	}
	
	// @RequestMapping("/chat/{room}/{name}")
	// @RequestMapping일 때 {}값을 가져오려면 @PathVariable을 사용하지만
	// @MessageMapping일 때에는 @DestinationVariable을 사용한다.
	@MessageMapping("/chat/{room}/{name}")
	public void chat(@DestinationVariable("room") String room, @DestinationVariable("name") String name, String content) throws Exception {
		
		simpMessagingTemplate.convertAndSend("/topic/" + room, new WebSocketDto(name, content));
		
	}
	
}
