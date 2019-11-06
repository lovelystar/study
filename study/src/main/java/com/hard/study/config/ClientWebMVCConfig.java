package com.hard.study.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
public class ClientWebMVCConfig implements WebMvcConfigurer {
	
	@Bean
	public ViewResolver getViewResolver() {
		
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		
		return viewResolver;
		
	}
	
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		
		configurer.enable();
		
	}
	
	// CSS, JS같은 resource들
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry.addResourceHandler("/resources/**")
				.addResourceLocations("/resources/");
		
	}
	
//	// 인터셉터
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		
//		registry.addInterceptor(new LoginInterceptor())
//				.addPathPatterns("/loginPost");
//		
////		registry.addInterceptor(authInterceptor())
//		registry.addInterceptor(new AuthInterceptor())
//				.addPathPatterns("/**")
//		
//		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
//		localeChangeInterceptor.setParamName("lang");
//		registry.addInterceptor(localeChangeInterceptor);
//	}
	
	@Bean
	public MessageSource messageSource(){
		
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:/messages/message");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
		
	}
	
	@Bean
	public SessionLocaleResolver localeResolver(){
		
		SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
		return sessionLocaleResolver;
		
	}
	
}