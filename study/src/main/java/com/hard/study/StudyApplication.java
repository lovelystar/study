package com.hard.study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableAutoConfiguration
public class StudyApplication extends SpringBootServletInitializer {
	
	public static void main(String[] args) {
		
		System.setProperty("server.servlet.context-path", "/study");
		SpringApplication.run(StudyApplication.class, args);
		
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		
		return application.sources(StudyApplication.class);
		
	}
	
}
