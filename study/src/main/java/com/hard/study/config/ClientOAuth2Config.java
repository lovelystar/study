package com.hard.study.config;

import java.util.Arrays;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenProviderChain;
import org.springframework.security.oauth2.client.token.ClientTokenServices;
import org.springframework.security.oauth2.client.token.JdbcClientTokenServices;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.client.token.grant.implicit.ImplicitAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordAccessTokenProvider;
import org.springframework.security.oauth2.common.AuthenticationScheme;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

@Configuration
@EnableOAuth2Client
@ComponentScan("com.hard.study")
@PropertySource("classpath:application.properties")
public class ClientOAuth2Config {
	
	private static final Logger logger = LoggerFactory.getLogger(ClientOAuth2Config.class);
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private Environment env;
	
	public void setDataSource(DataSource dataSource) {
		
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		
	}
	
	@Bean
	public ClientTokenServices clientTokenServices() {
		
		return new JdbcClientTokenServices(jdbcTemplate.getDataSource());
		
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
		
	}
	
	@Bean
	@Scope(value="session", proxyMode=ScopedProxyMode.INTERFACES)
	// Scope
	// - singleton : 전체 App을 위해 생성되는 Bean
	// - prototype : Bean이 주입될 때마다 생성되거나 spring application context에서 얻는 빈
	// - session : 각 세션용으로 생성되는 Bean
	// - request : 각 요청용으로 생성되는 Bean
	
	// proxyMode
	// - ScopedProxyMode.INTERFACES : 인터페이스를 구현하고, 구현 Bean에 위임할 필요가 있다.
	public OAuth2RestOperations restTemplate(OAuth2ClientContext oauth2ClientContext) {
		
		OAuth2RestTemplate template = new OAuth2RestTemplate(resources(), new DefaultOAuth2ClientContext(oauth2ClientContext.getAccessTokenRequest()));
		AccessTokenProviderChain provider = new AccessTokenProviderChain(Arrays.asList(
				new AuthorizationCodeAccessTokenProvider(),
				new ImplicitAccessTokenProvider(),
				new ResourceOwnerPasswordAccessTokenProvider(),
				new ClientCredentialsAccessTokenProvider()
		));
		
		provider.setClientTokenServices(clientTokenServices());
		
		return template;
		
	}
	
	private OAuth2ProtectedResourceDetails resources() {
		 
		String accessTokenUri = env.getProperty("security.oauth2.client.access-token-uri"); // 엑세스 토큰 URI : /oauth/token
		String userAuthorizationUri = env.getProperty("security.oauth2.client.user-authorization-uri"); // 사용자 인증 URI : /oauth/authorize
		String clientID = env.getProperty("security.oauth2.client.id"); // 클라이언트 ID : sumin
        String clientSecret = passwordEncoder().encode(env.getProperty("security.oauth2.client.client-secret")); // 클라이언트 시크릿  : secret
        
        AuthorizationCodeResourceDetails resource = new AuthorizationCodeResourceDetails();
        
        resource.setAuthenticationScheme(AuthenticationScheme.query);
        resource.setClientAuthenticationScheme(AuthenticationScheme.form);
        resource.setClientId(clientID);							// 클라이언트 ID   : sumin
        resource.setClientSecret(clientSecret);					// 클라이언트 시크릿  : secret
        resource.setAccessTokenUri(accessTokenUri);				// 엑세스 토큰 URI : /oauth/token 
        resource.setUserAuthorizationUri(userAuthorizationUri);	// 사용자 인증 URI : /oauth/authorize
        resource.setScope(Arrays.asList("read","write"));		// 권한의 범위 
        resource.setUseCurrentUri(false);
        
        return resource;
        
	}
	
}
