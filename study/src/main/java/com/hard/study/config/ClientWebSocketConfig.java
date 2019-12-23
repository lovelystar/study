package com.hard.study.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// 임시 작성
// resource 서버로 옮겨서 token 유/무 + 제대로 된 token 인지 여부에 따라 message 전송 여부 확인.
@Configuration
@EnableWebSocketMessageBroker
public class ClientWebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		
		// enableStompBrokerRelay : SimpleBroker의 기능과 외부 message broker에 메세지 전달하는 기능
		registry.enableSimpleBroker("/topic"); // 해당 경로로 SimpleBroker를 등록한다. Subscribe하는 client에게 메세지 전달
		registry.setApplicationDestinationPrefixes("/app"); // client에서 SEND 요청을 처리
		
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		
		registry.addEndpoint("/chat").setAllowedOrigins("*").withSockJS();
		
	}
	
}
