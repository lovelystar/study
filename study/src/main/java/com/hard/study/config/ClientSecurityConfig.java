package com.hard.study.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalAuthentication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ClientSecurityConfig extends WebSecurityConfigurerAdapter {
	
//	// 사용자 정의 
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		
//		auth
//			.inMemoryAuthentication()
//				.withUser("user")
//				.password(passwordEncoder.encode("password"))
//				.roles("USER")
//			.and()
//				.withUser("admin")
//				.password(passwordEncoder.encode("admin"))
//				.roles("USER", "ADMIN")
//			.and()
//				.withUser("sumin")
//				.password(passwordEncoder.encode("password"))
//				.roles("SUMIN", "USER", "ADMIN");
//		
//	}
	
//	// security 안태우는 장소
//	@Override
//	public void configure(WebSecurity web) {
//		
//		web
//			.ignoring()
//				.antMatchers("/resources/**");
//		
//	}
	
	// security 접근 권한
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
		// 인증되지 않은 사용자는 허용하지 않겠다.
		http
			.anonymous()
				.disable();
		
		// iframe 사용을 막겠다. 하지만 sameOrigin을 사용함으로써 같은 url의 iframe은 허용
		http
			.headers()
				.frameOptions()
					.sameOrigin();
		
		// cors : 다른 외부 링크로부터 데이터를 받기위해 사용 ( ex. 부트스트랩 )
		// csrf 보안 취약점 // disable 없애야 함 // csrf만 설정하면 403에러
		http
			.cors()
				.and()
					.csrf()
						.disable();
		
		http
			.authorizeRequests()
				// 이걸로 하면 안되는 이유가 뭐지;;;
//				.anyRequest()
//					.permitAll();
				.antMatchers("/study/client/**")
					.permitAll();
		
//		http
//			.authorizeRequests()
//				.antMatchers("/client/**")
//					.authenticated()
//				.anyRequest()
//					.permitAll()
//			.and()
//			.formLogin()
//			.and()
//			.httpBasic();
		
    }

//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		
//		return super.authenticationManagerBean();
//		
//	}
	
}