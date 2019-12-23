package com.hard.study.dto.websocket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WebSocketDto {
	
	private String name;
	private String content;
	
	public WebSocketDto(String name, String content) {
		this.name = name;
		this.content = content;
	}
	
}
