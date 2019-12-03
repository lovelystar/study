package com.hard.study.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.WebUtils;

import com.hard.study.dto.oauth.AuthorizationTokenDto;
import com.hard.study.service.oauth.AuthorizationTokenService;
import com.hard.study.service.oauth.CookieService;
import com.hard.study.vo.common.CommonCode;
import com.hard.study.vo.oauth.AuthorizationTokenVo;
import com.hard.study.vo.oauth.UserInfoVo;

@Controller
@RequestMapping(value="/client")
public class ClientController {
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Autowired
	private Environment env;
	
	@Autowired
	private AuthorizationTokenService authorizationTokenService;
	
	@Autowired
	private CookieService cookieService;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// client의 기존 인증정보( AccessToken )이 있는지 확인
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			System.out.println("restTemplate.getOAuth2ClientContext의 accessToken이 null이라 쿠키 확인합니다..");
			// accessToken이 없는 경우 쿠키가 있는지 확인
			// 쿠키 정보도 없으면
			if(!cookieService.getCookie(request)) {
				
				System.out.println("restTemplate.getOAuth2ClientContext의 accessToken이 null이고, 쿠키가 없으니 resource서버 접근");
				// restTemplate의 resource를 가지고 동작한다. + 로그인이 되면 db의 redirect url로 이동
				restTemplate.getAccessToken();
				
			}
			
		}
		
		
		ModelAndView mav = new ModelAndView();
		
		String accessToken = restTemplate.getAccessToken().toString();
		String username = null;
		
		// accessToken이 null이 아니라면
		if(accessToken != null) {
			
			// 1. username 가져온다.
			// 2. cookie를 확인해서 cookie가 없으면
			// 3. cookie생성
			username = cookieService.getUsernameCookieCheck(request, accessToken, response);
			
		}
		
		
		mav.addObject("username", username);
		mav.setViewName("client");
		
		return mav;
		
	}
	
	@RequestMapping(value="/callback", method=RequestMethod.GET)
	public ModelAndView callBack(@RequestParam("code") String code, @RequestParam("state") String state) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		AuthorizationTokenDto tokenDto = new AuthorizationTokenDto();
		
		try {
			
			String grantType = env.getProperty("config.oauth2.grant-type");
			String baseUrl = env.getProperty("config.oauth2.oauth-base-uri");
			String redirectUrl = env.getProperty("config.oauth2.redirect-uri");
			String scope = env.getProperty("config.oauth2.scope");
			
			tokenDto.setCode(code);
			tokenDto.setState(state);
			tokenDto.setGrantType(grantType);
			tokenDto.setBaseUrl(baseUrl);
			tokenDto.setRedirectUrl(redirectUrl);
			tokenDto.setScope(scope);
			
			AuthorizationTokenVo tokenVo = authorizationTokenService.getAuthorizationToken(tokenDto);
			
			// 엑세스 토큰을 제대로 발급했으면
			if(tokenVo.getAccessToken() != null) {
				
				tokenVo.setResultCode(CommonCode.SUCCESS_CODE);
				// restTemplate에 accessToken 세팅
				restTemplate.getOAuth2ClientContext().setAccessToken(new DefaultOAuth2AccessToken(tokenVo.getAccessToken()));
				RedirectView redirectView = new RedirectView(env.getProperty("server.servlet.context-path") + "/client/");
				mav.setView(redirectView);
				
				// 오류가 났으면 Exception 떨어지게 해라.
			} else {
				
				tokenVo.setResultCode(CommonCode.FAIL_CODE);
				throw new Exception();
				
			}
			
		} catch(Exception e) {
			
			RedirectView redirectView = new RedirectView(env.getProperty("server.servlet.context-path") + "/client/");
			mav.setView(redirectView);
			
			return mav;
			
		}
		
		return mav;
		
	}
	
	// react cookie 조회 axios
	@ResponseBody
	@RequestMapping(value="/cookie/token", produces=MediaType.APPLICATION_JSON_VALUE)
	public String cookieToken(HttpServletRequest request, HttpServletResponse response, @RequestBody UserInfoVo vo) throws Exception {
		
		String cookieToken = null;
		String username = null;
		
		try {
			
			String accessToken = restTemplate.getAccessToken().toString();
			Map<String, Object> reqMap = new HashMap<String, Object>();
			reqMap.put("access_token", accessToken);
			username = vo.getUsername();
			
			if(username != null) {
				
				reqMap.put("username", username);
				cookieToken = "Bearer " + cookieService.getCookieToken(request, reqMap, response);
				
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return cookieToken;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/logout", method=RequestMethod.POST)
	public String logout(HttpSession session, HttpServletRequest req, HttpServletResponse res, @RequestBody UserInfoVo vo) throws Exception {
//		
//		res.sendRedirect("http://localhost:8082/studyoauthserver/logout");
//		
//		
//		
		String username = null;
		String logout = null;
		AuthorizationTokenDto tokenDto = new AuthorizationTokenDto();
		
		try {
			
			username = vo.getUsername();
			
			// session 초기화
			session.invalidate();
			
			// 쿠키 삭제
			Cookie clientCookie = WebUtils.getCookie(req, username);
			
			clientCookie.setPath("/study");
			clientCookie.setMaxAge(0);
			
			res.addCookie(clientCookie);
			
			String baseUrl = env.getProperty("config.oauth2.oauth-base-uri");
			tokenDto.setBaseUrl(baseUrl);
			
			// client 서버 인증 정보 초기화
			restTemplate.getOAuth2ClientContext().setAccessToken(null);
//			restTemplate.getOAuth2ClientContext().setAccessToken(new DefaultOAuth2AccessToken(""));
			
			// 인증 서버 인증 정보 초기화
			authorizationTokenService.oauthServerLogout(tokenDto);
			
			logout = "logout success";
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
		return logout;
//		return "redirect:http://localhost:8082/studyoauthserver/logout";
		
	}
	
}
